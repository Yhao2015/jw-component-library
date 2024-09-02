import { App, Plugin } from 'vue';
import Form from './src/index.vue';

export const FormPlugin: Plugin = {
  install(app: App) {
    app.component('my-form', Form);
  },
};

export {
  Form,
};
