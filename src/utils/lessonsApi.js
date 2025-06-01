import axios from 'axios'

const API_URL = 'https://682209c9b342dce8004cda66.mockapi.io/api/v1/lessons'

const fetchLessons = async coursId => {
	let lessons = []
	let error = null

	try {
		const response = await axios.get(`${API_URL}`, {
			params: { coursId }
		})
		lessons = response.data
	} catch (err) {
		error = err.message || 'Ошибка при загрузке уроков'
	}

	return { lessons, error }
}

const createLesson = async (coursId, lessonData) => {
	let lesson = null
	let error = null

	try {
		const response = await axios.post(`${API_URL}`, {
			...lessonData,
			coursId
		})
		lesson = response.data
	} catch (err) {
		error = err.message || 'Ошибка при создании урока'
	}

	return { lesson, error }
}

const updateLesson = async (lessonId, lessonData) => {
	let lesson = null
	let error = null

	try {
		const response = await axios.put(`${API_URL}/${lessonId}`, lessonData)
		lesson = response.data
	} catch (err) {
		error = err.message || 'Ошибка при обновлении урока'
	}

	return { success: !error, lesson, error }
}

const deleteLesson = async lessonId => {
	let error = null

	try {
		await axios.delete(`${API_URL}/${lessonId}`)
	} catch (err) {
		error = err.message || 'Ошибка при удалении урока'
	}

	return { success: !error, error }
}

export { fetchLessons, createLesson, updateLesson, deleteLesson }
