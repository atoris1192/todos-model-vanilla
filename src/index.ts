import { App } from './App';

const app = new App();
window.addEventListener("load", () => {
  app.mount();
})
window.addEventListener("unload", () => {
})