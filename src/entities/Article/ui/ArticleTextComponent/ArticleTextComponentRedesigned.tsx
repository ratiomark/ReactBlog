import clsx from 'clsx';
import { ArticleTextBlock } from '../../model/types/article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleTextComponent.module.scss';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Heading } from '@/shared/ui/redesigned/Typography';

interface ArticleTextComponentProps {
	className?: string
	block: ArticleTextBlock
}

export const ArticleTextComponentRedesigned = memo((props: ArticleTextComponentProps) => {
	const {
		block
	} = props
	const { paragraphs, title } = block

	return (
		<>
			{title && <Heading title={title} className={cls.title} />}
			{paragraphs.map((text, index) => <Text text={text} key={index} className={cls.paragraph} />)}
		</>
	);
})
ArticleTextComponentRedesigned.displayName = 'ArticleTextComponent'