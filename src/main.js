// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импортируем настроенный роутер
import { createPinia } from 'pinia' // Импортируем Pinia
import { createPersistedState } from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css' // Импортируем базовые стили (включая Tailwind)

// Импортируем наш Pinia Store для аутентификации
import { useAuthStore } from './stores/auth'

const app = createApp(App)

// Создаем экземпляр Pinia
const pinia = createPinia()
pinia.use(createPersistedState())

// Используем Pinia
app.use(pinia)
app.use(ElementPlus)

// Инициализируем Pinia Store для аутентификации
// Это важно сделать после app.use(pinia), но до app.mount()
const authStore = useAuthStore()
authStore.initializeAuth() // Загружаем состояние аутентификации из localStorage

// Используем Vue Router
app.use(router)

// Монтируем приложение в DOM
app.mount('#app')
