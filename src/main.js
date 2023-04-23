import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/user";
import router from "./router";
import "./styles.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
