import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import { createHead } from '@vueuse/head';
import 'ant-design-vue/es/message/style/index.css';
import './assets/index.postcss';
import VueCodemirror from 'vue-codemirror';
import { basicSetup } from 'codemirror';
const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);
app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: 'Code goes here...',
  readOnly: true,
  extensions: [basicSetup],
  // ...
});
app.mount('#app');
