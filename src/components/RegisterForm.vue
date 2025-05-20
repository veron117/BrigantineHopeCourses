<template>
	<div>
		<div
			v-if="authStore.message"
			class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
			role="alert"
		>
			<span class="block sm:inline">{{ authStore.message }}</span>
			<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
				<svg
					@click="authStore.clearError()"
					class="fill-current h-6 w-6 text-red-500 cursor-pointer"
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<title>Close</title>
					<path
						d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L6.342 7.344a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
					/>
				</svg>
			</span>
		</div>

		<form>
			<div class="mb-4">
				<label for="name" class="block text-gray-700 text-sm font-bold mb-2"
					>Имя:</label
				>
				<input
					type="text"
					id="name"
					v-model="name"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					required
				/>
			</div>

			<div class="mb-4">
				<label for="email" class="block text-gray-700 text-sm font-bold mb-2"
					>Email:</label
				>
				<input
					type="email"
					id="email"
					v-model="email"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					required
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="block text-gray-700 text-sm font-bold mb-2"
					>Пароль:</label
				>
				<input
					type="password"
					id="password"
					v-model="password"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					required
				/>
			</div>

			<div class="mb-6">
				<label
					for="password_confirmation"
					class="block text-gray-700 text-sm font-bold mb-2"
					>Подтверждение пароля:</label
				>
				<input
					type="password"
					id="password_confirmation"
					v-model="password_confirmation"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					required
				/>
			</div>
			<div class="mb-6">
				<label for="job" class="block text-gray-700 text-sm font-bold mb-2"
					>Должность:</label
				>
				<input
					type="text"
					id="job"
					v-model="job"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="mb-6">
				<label
					for="phoneNumber"
					class="block text-gray-700 text-sm font-bold mb-2"
					>Номер телефона:</label
				>
				<input
					type="text"
					id="phoneNumber"
					v-model="phoneNumber"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					required
				/>
			</div>

			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="button"
					:disabled="authStore.loading"
					@click="handleRegister"
				>
					<span v-if="authStore.loading">Загрузка...</span>
					<span v-else>Зарегистрироваться</span>
				</button>
				<a
					href="#"
					@click.prevent="$emit('switch-to-login')"
					class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				>
					Уже есть аккаунт? Войти
				</a>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const job = ref('')
const phoneNumber = ref('')
const password = ref('')
const password_confirmation = ref('')

// Определяем события, которые компонент может излучать
const emit = defineEmits(['success', 'switch-to-login'])

const handleRegister = async () => {
	// Простая валидация паролей на совпадение
	if (password.value !== password_confirmation.value) {
		authStore.setError('Пароли не совпадают.')
		return
	}

	await authStore.register({
		name: name.value,
		email: email.value,
		job: job.value,
		phoneNumber: phoneNumber.value,
		password: password.value,
		token: generateToken()
	})

	// Если регистрация успешна (предполагаем, что register экшен не устанавливает ошибку при успехе)
	if (!authStore.message) {
		emit('success') // Излучаем событие 'success'
	}
}

// Очищаем ошибку и поля формы при монтировании (или при открытии модального окна)
onMounted(() => {
	authStore.clearError()
	name.value = ''
	email.value = ''
	job.value = ''
	phoneNumber.value = ''
	password.value = ''
	password_confirmation.value = ''
})

// watch(
// 	() => props.show,
// 	newVal => {
// 		if (newVal) {
// 			authStore.clearError()
// 			name.value = ''
// 			email.value = ''
// 			password.value = ''
// 			password_confirmation.value = ''
// 		}
// 	}
// )
function generateToken() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const tokenLength = 30 // длина токена
	let token = ''

	for (let i = 0; i < tokenLength; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length)
		token += chars.charAt(randomIndex)
	}

	return token
}
</script>
