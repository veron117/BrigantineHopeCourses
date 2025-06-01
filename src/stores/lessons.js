import { defineStore } from 'pinia'
import {
	fetchLessons,
	createLesson,
	updateLesson,
	deleteLesson
} from '@/utils/lessonsApi'

export const useLessonsStore = defineStore('lessons', {
	state: () => ({
		lessons: [],
		loading: false,
		error: null
	}),

	actions: {
		async fetchLessons(courseId) {
			this.loading = true
			const { lessons, error } = await fetchLessons(courseId)

			this.lessons = lessons
			this.error = error
			this.loading = false
		},

		async createLesson(courseId, lessonData) {
			this.loading = true
			const { lesson, error } = await createLesson(courseId, lessonData)

			if (error) {
				this.error = error
				console.error('Error creating lesson:', error)
				throw error
			} else {
				this.lessons.push(lesson)
				this.error = null
			}

			this.loading = false
			return lesson
		},

		async updateLesson(lessonId, lessonData) {
			this.loading = true
			const { lesson, error } = await updateLesson(lessonId, lessonData)

			if (error) {
				this.error = error
				console.error('Error updating lesson:', error)
				throw error
			} else {
				const index = this.lessons.findIndex(l => l.id === lessonId)
				if (index !== -1) {
					this.lessons[index] = lesson
				}
				this.error = null
			}

			this.loading = false
			return lesson
		},

		async deleteLesson(lessonId) {
			this.loading = true
			const { success, error } = await deleteLesson(lessonId)

			if (error) {
				this.error = error
				console.error('Error deleting lesson:', error)
				throw error
			} else {
				this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId)
				this.error = null
			}

			this.loading = false
		},
		clearLessons() {
			this.lessons = []
			this.error = null
			this.loading = false
		}
	}
})
