// src/stores/auth.js

import { defineStore } from 'pinia'
import router from '@/router'
import {
	fetchUser,
	authorization,
	registration,
	update
} from '@/utils/usersApi'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		token: localStorage.getItem('auth_token'),
		isAuthenticated: !!localStorage.getItem('auth_token'),
		loading: false,
		message: null,
		redirectPath: null,
		isModalOpen: false,
		modalType: null
	}),
	persist: true,
	actions: {
		openLoginModal(redirectPath = null) {
			this.modalType = 'login'
			this.isModalOpen = true
			this.clearError()
			if (redirectPath) {
				this.redirectPath = redirectPath
			}
		},
		openRegisterModal() {
			this.modalType = 'register'
			this.isModalOpen = true
			this.clearError()
			this.redirectPath = null
		},
		openUserEditModal() {
			this.modalType = 'userEdit'
			this.isModalOpen = true
			this.clearError()
			this.redirectPath = null
		},
		closeModal() {
			this.isModalOpen = false
			this.modalType = null
			this.clearError()
		},
		// -----------------------------------------------

		async login(email, password) {
			this.loading = true
			this.message = null

			const { user, error } = await authorization(email, password)

			if (error) {
				this.setError(error)
				this.loading = false
				return
			}

			this.user = {
				id: user.id,
				email: user.email,
				name: user.name,
				job: user.job,
				phoneNumber: user.phoneNumber,
				favoriteCourses: user.favoriteCourses,
				createdAt: user.createdAt
			}

			this.token = user.token
			this.isAuthenticated = true
			localStorage.setItem('auth_token', this.token)

			this.closeModal()

			this.loading = false
		},

		async register(userData) {
			this.loading = true
			this.message = null

			const { status, error } = await registration(userData)

			if (error) {
				this.message = error
				this.loading = false
				return
			}

			if (status === 201) {
				this.modalType = 'login'
				this.message = 'Регистрация успешна! Теперь вы можете войти.'
			}

			this.loading = false
		},

		async editProfile(userId, data) {
			this.loading = true
			this.message = null

			const { user, status, error } = await update(userId, data)

			if (error) {
				this.message = error
				this.loading = false
				return
			}

			if (status === 200) {
				this.user = user
				this.message = 'Данные пользователя успешно обновлены!'
			}

			this.loading = false
		},

		async logout() {
			this.loading = true
			this.message = null

			// Имитация задержки
			await new Promise(resolve => setTimeout(resolve, 500))

			// Имитация выхода
			this.user = null
			this.token = null
			this.isAuthenticated = false
			localStorage.removeItem('auth')
			localStorage.removeItem('auth_token')
			this.redirectPath = null // Сбрасываем путь перенаправления при выходе

			// Перенаправить на главную страницу после выхода
			router.push({ path: '/' })

			this.loading = false
		},

		setError(error) {
			// Имитация установки ошибки: { error } {
			this.message = error
		},
		clearError() {
			this.message = null
		},

		async initializeAuth() {
			await this.fetchUser()
		},

		// Имитация получения данных пользователя (не используется напрямую в этом сценарии, но для примера)
		async fetchUser() {
			const token = localStorage.getItem('auth_token')

			if (token) {
				this.token = token
				this.isAuthenticated = true

				const { user, error } = await fetchUser(this.token)

				if (error) {
					this.logout()
					return
				}

				this.user = user
			} else {
				this.isAuthenticated = false
				this.user = null
				this.token = null
			}
		}
	}
})
