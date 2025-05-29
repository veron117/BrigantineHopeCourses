// stores/courses.js
import { defineStore } from 'pinia'
import { getCourses, getLessons } from '@/utils/coursesApi'
import { saveFavoriteCourses } from '@/utils/usersApi'

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		favoriteCourseIds: [],
		loading: false,
		error: null
	}),
	persist: {
		key: 'courses',
		storage: localStorage,
		paths: ['favoriteCourseIds', 'courses']
	},
	actions: {
		async fetchCourses() {
			this.loading = true
			this.error = null

			try {
				const { courses, error } = await getCourses()
				this.courses = courses
				this.error = error
			} catch (err) {
				this.error = err
			}

			this.loading = false
		},
		async fetchLessons(courseId) {
			this.loading = true
			this.error = null

			const { lessons, error } = await getLessons(courseId)

			if (error) {
				this.error = error
			}

			this.loading = false

			return lessons
		},
		getCourseById(courseId) {
			return this.courses.find(course => course.id === courseId)
		},
		getFavorites() {
			const favoriteCourses = this.courses.filter(course =>
				this.favoriteCourseIds.includes(course.id)
			)
			return favoriteCourses
		},
		setFavorites(courses) {
			if (courses) {
				try {
					this.favoriteCourseIds = JSON.parse(courses)
				} catch (e) {
					console.error('Ошибка при парсинге избранных курсов', e)
				}
			}
		},
		toggleFavorite(courseId) {
			const index = this.favoriteCourseIds.indexOf(courseId)
			if (index === -1) {
				this.favoriteCourseIds.push(courseId)
			} else {
				this.favoriteCourseIds.splice(index, 1)
			}
			this.saveFavorites()
		},
		saveFavorites() {
			const userId = JSON.parse(localStorage.getItem('auth') || '{}')?.user?.id
			const favoriteCourses = JSON.stringify(this.favoriteCourseIds)

			saveFavoriteCourses(userId, favoriteCourses)
		},
		isFavorite(courseId) {
			return this.favoriteCourseIds.includes(courseId)
		},
		clearFavorites() {
			this.favoriteCourseIds = []
		}
	}
})
