import clsx from 'clsx';
import { ArticleImageBlock } from '../../model/types/article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import cls from './ArticleImageComponent.module.scss';

interface ArticleImageComponentProps {
	className?: string
	block: ArticleImageBlock
}

export const ArticleImageComponent = memo((props: ArticleImageComponentProps) => {
	const {
		className,
		block
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.articleImageComponent,
			[className])}
		>
			<img src={block.src} alt={'Картина не прогрузилась'} className={cls.img} />
			{block.title && <Text text={block.title} className={cls.titleImage} />}
		</div>
	);
})
ArticleImageComponent.displayName = 'ArticleImageComponent'