import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('aether_papers');
      localStorage.removeItem('aether_bookmarks');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030407] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0d101a] border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-semibold text-white">화면을 불러오는 도중 오류가 발생했습니다</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {this.state.error?.message || '알 수 없는 렌더링 에러가 발생했습니다.'}
            </p>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="deepmind-btn-tonal px-5 py-2.5 text-xs font-medium cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>데이터 초기화 및 새로고침</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
