// stores/courses.js
import { defineStore } from 'pinia'
import {
	getCourses,
	createCourse,
	deleteCourse,
	updateCourse
} from '@/utils/coursesApi'
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
		async createCourse(courseData) {
			this.loading = true
			this.error = null

			const { course, error } = await createCourse(courseData)

			if (error) {
				this.error = error
				return { success: false, error }
			}

			this.courses.push(course)
			this.loading = false
			return { success: true, course }
		},
		async deleteCourse(courseId) {
			this.loading = true
			this.error = null

			const { success, error } = await deleteCourse(courseId)

			if (error) {
				this.error = error
				return { success: false, error }
			}

			this.courses = this.courses.filter(course => course.id !== courseId)
			this.loading = false
			return { success: true }
		},
		async updateCourse(courseId, courseData) {
			this.loading = true
			this.error = null

			const { success, course, error } = await updateCourse(
				courseId,
				courseData
			)

			if (error) {
				this.error = error
				return { success: false, error }
			}

			const index = this.courses.findIndex(c => c.id === courseId)
			if (index !== -1) {
				this.courses[index] = course
			}

			this.loading = false
			return { success: true }
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
