import { App, Plugin } from 'vue';
import AddForms from './src/index.vue';

export const AddFormsPlugin: Plugin = {
    install(app: App) {
        app.component('my-add-forms', AddForms);
    }
};

export {
    AddForms
}
