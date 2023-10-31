import { App, Plugin } from 'vue';
import Pagination from './src/index.vue';

export const PaginationPlugin: Plugin = {
  install(app: App) {
    app.component('my-pagination', Pagination);
  },
};

export {
  Pagination,
};
