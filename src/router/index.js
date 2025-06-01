// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomePage from '../views/HomePage.vue'
import CoursesPage from '../views/CoursesPage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import AdminCoursesPage from '@/views/admin/AdminCoursesPage.vue'
import AdminLessonsPage from '@/views/admin/AdminLessonsPage.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ContactsPage from '@/views/ContactsPage.vue'
import CoursePage from '@/views/CoursePage.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

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
		component: AdminLayout,
		children: [
			{
				path: 'courses',
				name: 'adminCourses',
				component: AdminCoursesPage,
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: 'courses/:courseId/lessons',
				name: 'adminLessons',
				component: AdminLessonsPage,
				meta: { requiresAuth: true, requiresAdmin: true }
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()
	const isAuthenticated = authStore.isAuthenticated

	if (to.meta.requiresAuth && !isAuthenticated) {
		authStore.openLoginModal(to.fullPath)
		next(false)
	} else {
		next()
	}
})

export default router
