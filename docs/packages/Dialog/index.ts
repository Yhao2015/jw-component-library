import { App, Plugin } from 'vue';
import Dialog from './src/index.vue';

export const DialogPlugin: Plugin = {
  install(app: App) {
    app.component('my-dialog', Dialog);
  },
};

export {
  Dialog,
};
