import { createElement } from "react";
import { createRoot } from "react-dom/client";
import LazyReactComponent from "@/components/LazyReactComponent";

export function loadReactComponent(projectName: string) {
  return () => createElement( LazyReactComponent, { path: `../projects${projectName}/App.tsx` } )
}

export function createReactApp(root: Element, component: React.ReactNode ) {
  const app = createRoot(root)

  const mount = () => app.render(component)

  const unmount = () => app.unmount()

  return { app, mount, unmount }
}
