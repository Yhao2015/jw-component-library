import { App, Plugin } from 'vue';
import Chart from './src/index.vue';

export const ChartPlugin: Plugin = {
  install(app: App) {
    app.component('my-chart', Chart);
  },
};

export {
  Chart,
};
