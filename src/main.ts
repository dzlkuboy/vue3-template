import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupPlugins } from './plugins';
import router from './router';

import 'virtual:windi.css';
import './styles/main.css';

const app = createApp(App);

setupPlugins(app);
app.use(router);

setupStore(app);

app.mount('#app');
