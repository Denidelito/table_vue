import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

createApp(App).use(store, VueAxios, axios).mount('#app');
