import { App } from 'vue'

const componentFiles = import.meta.glob('@/components/Global/*.vue')

export const register = (app: App<Element>): void => {
  Object.entries(componentFiles).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const componentName = (path as any)
      ?.split('/')
      .pop()
      .replace(/\.\w+$/, '')
    definition().then((data) => {
      app.component(componentName, (data as any)?.default)
    })

    // Register component on this Vue instance
  })
}
