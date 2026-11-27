import type { ReactNode } from 'react';
interface PageTransitionProps { children: ReactNode; keyProp: string; }
// Keep initial text painted; route continuity does not need a JS animation engine.
export default function PageTransition({ children, keyProp }: PageTransitionProps) {
  return <div key={keyProp} className="page-transition-wrapper route-content">{children}</div>;
}
