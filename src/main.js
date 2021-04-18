import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import VueObserveVisibility from 'vue-observe-visibility';

import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

// Intersection observer polyfill
import 'intersection-observer';

import App from './App.vue';
import store from './store';

Vue.component('RecycleScroller', RecycleScroller);

Vue.use(VueVirtualScroller);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
