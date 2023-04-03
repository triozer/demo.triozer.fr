import { createApp, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export function loadVueComponent(projectName: string) {
  const path = `../projects${projectName}/App.vue`

  return defineAsyncComponent({
    loader: () => import(path),
    loadingComponent: { template: `Loading Vue component at ${path}...` },
    errorComponent: { template: `An error occurred while loading Vue component at ${path}.` },
  })
}

export function createVueApp(root: Element | string, component: Component) {
  const app = createApp(component)

  const mount = () => app.mount(root)

  const unmount = app.unmount

  return { app, mount, unmount }
}
