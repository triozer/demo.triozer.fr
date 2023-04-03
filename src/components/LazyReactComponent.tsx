import { Suspense, ReactElement, lazy } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactElement | null;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface LazyReactComponentProps {
  path: string
}

const LazyReactComponent: React.FC<LazyReactComponentProps> = ({
  path,
}) => {
  const LazyComponent = lazy(() => import(/* @vite-ignore */ path))

  const LazyComponentWithErrorBoundary = () => {
    return (
      <ErrorBoundary fallback={<div>An error occurred while loading Vue component at ${path}.</div>}>
        <Suspense fallback={<div>Loading React component at {path}...</div>}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return <LazyComponentWithErrorBoundary />;
};

export default LazyReactComponent;
