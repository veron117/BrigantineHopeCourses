import axios from 'axios'

const API_URL = 'https://6825d9cc397e48c91313dc45.mockapi.io/api/v1/users'
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

const fetchUser = async token => {
	let user = null
	let error = null

	try {
		const response = await axios.get(API_URL, {
			params: { token }
		})
		const users = response.data

		if (users.length === 0) {
			error = 'Пользователь не найден'
			return { user, error }
		}
		user = {
			id: users[0].id,
			email: users[0].email,
			name: users[0].name,
			job: users[0].job,
			phoneNumber: users[0].phoneNumber,
			favoriteCourses: users[0].favoriteCourses,
			createdAt: users[0].createdAt
		}
	} catch (err) {
		error = err
	}

	return { user, error }
}

const authorization = async (email, password) => {
	let user = null
	let error = null

	try {
		const response = await axios.get(API_URL, {
			params: { email }
		})
		const users = response.data

		if (users.length === 0) {
			error = 'Пользователь не найден'
			return { user, error }
		}
		user = users[0]
		if (user.password !== password) {
			error = 'Проверьте правильность введённых данных'
			return { user, error }
		}
	} catch (err) {
		error = err
	}

	return { user, error }
}

const registration = async userData => {
	let status = null
	let error = null

	try {
		if (!isValidEmail(userData.email)) {
			error = 'Проверьте правильность введённого email'
			return { status, error }
		}

		const response = await axios.get(API_URL)
		const existingUsers = response.data

		// Проверка, существует ли пользователь с таким email
		const userExists = existingUsers.some(
			user => user.email.toLowerCase() === userData.email.toLowerCase()
		)

		if (userExists) {
			error = 'Пользователь с таким email уже зарегистрирован'
			return { status, error }
		}

		// Если всё хорошо, создаём нового пользователя
		const createResponse = await axios.post(API_URL, userData)

		status = createResponse.status
		error = createResponse.error
	} catch (err) {
		error = err
	}

	return { status, error }
}

const update = async (userId, data) => {
	let status = null
	let error = null
	let user = null

	try {
		const updateResponse = await axios.put(`${API_URL}/${userId}`, data)
		status = updateResponse.status

		if (status === 200) {
			const updatedUser = updateResponse.data
			user = {
				id: updatedUser.id,
				email: updatedUser.email,
				name: updatedUser.name,
				job: updatedUser.job,
				phoneNumber: updatedUser.phoneNumber,
				favoriteCourses: updatedUser.favoriteCourses,
				createdAt: updatedUser.createdAt
			}
		}
	} catch (err) {
		error = err
	}

	return { user, status, error }
}

const saveFavoriteCourses = async (userId, favoriteCourses) => {
	try {
		await axios.put(`${API_URL}/${userId}`, {
			favoriteCourses: favoriteCourses
		})
	} catch (error) {
		return error
	}
}

export { fetchUser, authorization, registration, update, saveFavoriteCourses }
