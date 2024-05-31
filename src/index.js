import { createApp } from "vue";
import App from "./App.vue";
import { crieNovaInstancia } from "./stores/index";

const app = createApp(App);
app.use(crieNovaInstancia());
app.mount("#app");
