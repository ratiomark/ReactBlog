import { Component, ErrorInfo, ReactNode, Suspense } from 'react'
import { ErrorDisplay } from '@/widgets/ErrorDisplay'

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	}

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// console.error('Uncaught error:', error, errorInfo)
	}

	public render() {
		const { hasError } = this.state
		const { children } = this.props
		if (hasError) {
			return (
				<Suspense fallback=''>
					<ErrorDisplay />
				</Suspense>
			)
		}
		return children
	}
}
