import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入全局样式表
import './assets/css/normalize.css'

const app = createApp(App);
app.use(router)

app.mount('#app')
