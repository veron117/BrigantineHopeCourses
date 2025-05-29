import axios from 'axios'

const API_URL = 'https://682209c9b342dce8004cda66.mockapi.io/api/v1'

const getCourses = async () => {
	let courses = []
	let error = null

	try {
		const response = await axios.get(`${API_URL}/courses`)
		courses = response.data
	} catch (err) {
		error = err.message || 'Ошибка при загрузке данных'
	}

	return { courses, error }
}

const getLessons = async coursId => {
	let lessons = []
	let error = null

	try {
		const response = await axios.get(`${API_URL}/lessons`, {
			params: { coursId }
		})
		lessons = response.data
	} catch (err) {
		error = err.message || 'Ошибка при загрузке данных'
	}

	return { lessons, error }
}

export { getCourses, getLessons }
