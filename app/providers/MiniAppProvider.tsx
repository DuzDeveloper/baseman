// Este archivo ya NO es necesario - toda la lógica está en app/providers.tsx
// Mantener solo por compatibilidad con imports existentes

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useMiniApp() {
  return { isReady: true };
}
