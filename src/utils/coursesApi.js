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
const createCourse = async courseData => {
	let course = null
	let error = null

	try {
		const response = await axios.post(`${API_URL}/courses`, courseData)
		course = response.data
	} catch (err) {
		error = err.message || 'Ошибка при создании курса'
	}

	return { course, error }
}

const deleteCourse = async courseId => {
	let error = null

	try {
		await axios.delete(`${API_URL}/courses/${courseId}`)
	} catch (err) {
		error = err.message || 'Ошибка при удалении курса'
	}

	return { success: !error, error }
}

const updateCourse = async (courseId, courseData) => {
	let error = null
	let course = null

	try {
		const response = await axios.put(
			`${API_URL}/courses/${courseId}`,
			courseData
		)
		course = response.data
	} catch (err) {
		error = err.message || 'Ошибка при обновлении курса'
	}

	return { success: !error, course, error }
}

export { getCourses, createCourse, deleteCourse, updateCourse }
