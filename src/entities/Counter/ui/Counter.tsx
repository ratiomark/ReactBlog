import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames'
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

interface CounterProps {
	className?: string;
}

export const Counter = ({ className }: CounterProps) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const counterValue = useSelector(getCounterValue)
	const increment = () => {
		dispatch(counterActions.increment())
	};

	const decrement = () => {
		dispatch(counterActions.decrement())
	};


	return (
		<div >
			<h1 data-testid="value-title">
				{counterValue}
			</h1>
			<Button onClick={increment}
				data-testid='increment'
			>
				{t('increment')}
			</Button>
			<Button onClick={decrement}
				data-testid='decrement'
			>
				{t('decrement')}
			</Button>
		</div>
	)
}