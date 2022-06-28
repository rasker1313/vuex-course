import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store/index"
import currencyPlugin from "@/currency"

const app = createApp(App);
app.use(store)
app.use(currencyPlugin)

app.mount('#app')
