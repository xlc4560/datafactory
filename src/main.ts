import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import { createHead } from '@vueuse/head';
import 'ant-design-vue/es/message/style/index.css';
import './assets/index.postcss';

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);

app.mount('#app');
