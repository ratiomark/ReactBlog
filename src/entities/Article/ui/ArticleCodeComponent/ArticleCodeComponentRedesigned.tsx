import clsx from 'clsx';
import { ArticleCodeBlock } from '../../model/types/article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Code } from '@/shared/ui/redesigned/Code/Code';
import cls from './ArticleCodeComponent.module.scss';

interface ArticleCodeComponentProps {
	className?: string
	block: ArticleCodeBlock
}

export const ArticleCodeComponentRedesigned = memo((props: ArticleCodeComponentProps) => {
	const {
		className,
		block
	} = props

	return (
		<div className={clsx(
			cls.articleCodeComponent,
			[className])}
		>
			<Code codeData={block.code} />
		</div>
	);
})
ArticleCodeComponentRedesigned.displayName = 'ArticleCodeComponent'