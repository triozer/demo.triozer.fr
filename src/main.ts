import './style.css'
import { createVueApp, loadVueComponent } from './framework/vue'
import { createReactApp, loadReactComponent } from './framework/react'
import DebugBar from './components/DebugBar.vue'

document.querySelector('#app')!.innerHTML = `
<div id="vue" class="w-full h-full">vue</div>
<div id="react" class="w-full h-full">react</div>
`

type App = ReturnType<typeof createVueApp> | ReturnType<typeof createReactApp>

const apps: App[] = [
  createVueApp('#title', DebugBar),
]

const pathname = window.location.pathname

if (pathname === "/") {
  apps.push(createVueApp(document.querySelector('#vue')!, {template: `Hello Vue!`,}))
  apps.push(createReactApp(document.querySelector('#react')!, 'Hello React!'))
} else {
  apps.push(
    createVueApp(document.querySelector('#vue')!, loadVueComponent(pathname)),
    createReactApp(document.querySelector('#react')!, loadReactComponent(pathname)()),
  )
}

apps.forEach(app => app.mount())
