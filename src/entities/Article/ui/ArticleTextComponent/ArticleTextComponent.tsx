import clsx from 'clsx';
import { ArticleTextBlock } from '../../model/types/article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleTextComponent.module.scss';
import { Text } from '@/shared/ui/Text/Text';

interface ArticleTextComponentProps {
	className?: string
	block: ArticleTextBlock
}

export const ArticleTextComponent = memo((props: ArticleTextComponentProps) => {
	const {
		className,
		block
	} = props
	const { paragraphs, title } = block
	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.articleTextComponent,
			[className])}
		>
			{title && <Text title={title} className={cls.title} />}
			{paragraphs.map((text, index) => <Text text={text} key={index} className={cls.paragraph} />)}
		</div>
	);
})
ArticleTextComponent.displayName = 'ArticleTextComponent'