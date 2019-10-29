import Vue from "vue";
import App from "./app.vue";
import { Loadmore } from "mint-ui";
import "mint-ui/lib/style.css";
Vue.component(Loadmore.name, Loadmore);
new Vue(App).$mount("#app");
