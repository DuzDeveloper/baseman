'use client';

import { useMiniApp } from '../providers/MiniAppProvider';

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function SafeArea({ children, className }: SafeAreaProps) {
  const { isReady } = useMiniApp();

  // Only apply insets when running inside a mini app
  if (!isReady) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`safe-area ${className || ''}`}>
      {children}
    </div>
  );
}
