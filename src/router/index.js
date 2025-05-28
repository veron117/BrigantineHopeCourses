// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomePage from '../views/HomePage.vue'
import CoursesPage from '../views/CoursesPage.vue'
import AdminDashboardPage from '../views/admin/AdminDashboardPage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ContactsPage from '@/views/ContactsPage.vue'
import CoursePage from '@/views/CoursePage.vue'

const routes = [
	{
		path: '/',
		component: DefaultLayout,
		children: [
			{ path: '', name: 'home', component: HomePage },
			{ path: 'courses', name: 'courses', component: CoursesPage },
			{ path: 'courses/:id', name: 'course', component: CoursePage },
			{ path: 'contacts', name: 'contacts', component: ContactsPage },
			{
				path: 'profile',
				name: 'userProfile',
				component: UserProfilePage,
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/admin',
		component: DefaultLayout, // Можно создать отдельный макет для админки
		children: [
			{
				path: '',
				name: 'adminDashboard',
				component: AdminDashboardPage,
				meta: { requiresAuth: true, requiresAdmin: true }
			}
			// Добавить другие маршруты для админки (управление курсами, пользователями и т.д.)
		]
	}
	// Добавить маршрут для страницы 404
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// Пример навигационной охраны (для имитации защиты маршрутов)
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()
	const isAuthenticated = authStore.isAuthenticated

	if (to.meta.requiresAuth && !isAuthenticated) {
		// Вместо перенаправления на страницу логина, открываем модальное окно
		// Можно сохранить to.fullPath, чтобы после успешного логина перенаправить пользователя
		// Например, в Pinia Store: authStore.setRedirectPath(to.fullPath);
		authStore.openLoginModal(to.fullPath)
		// Остаемся на текущей странице (или перенаправляем на главную, если текущая страница требует авторизации)
		// next(false); // Отменяет текущую навигацию
		// Или:
		next(false) // Перенаправить на домашнюю страницу, если требуется авторизация, но пользователь не авторизован
	}
	// Логика requiresGuest больше не нужна, так как нет отдельных страниц логина/регистрации
	// else if (to.meta.requiresGuest && isAuthenticated) {
	//   next({ name: 'home' });
	// }
	else {
		next()
	}
})

export default router
