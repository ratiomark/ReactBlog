import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
	className?: string
	codeData: string
}

export const Code = memo((props: CodeProps) => {
	const {
		className,
		codeData
	} = props

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(codeData)
	}, [codeData])

	return (
		<pre className={clsx(
			cls.Code,
			[className])
		}
		>
			<Button onClick={onCopy} variant='backgroundInverted_border' className={cls.button}>Copy</Button>
			<code>
				{codeData}
			</code>
		</pre >
	);
})
Code.displayName = 'CodeComponent'