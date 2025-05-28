<template>
	<div>
		<ElForm
			ref="formRef"
			:model="form"
			:rules="rules"
			label-width="auto"
			label-position="top"
			size="large"
		>
			<!-- Email -->
			<ElFormItem prop="email" label="Email">
				<ElInput v-model="form.email" placeholder="Email..." clearable />
			</ElFormItem>

			<!-- Имя -->
			<ElFormItem prop="name" label="ФИО">
				<ElInput v-model="form.name" placeholder="Введите ФИО..." clearable />
			</ElFormItem>

			<!-- Пароль -->
			<ElFormItem prop="password" label="Пароль">
				<ElInput
					type="password"
					v-model="form.password"
					placeholder="Пароль..."
					clearable
				/>
			</ElFormItem>

			<!-- Подтверждение пароля -->
			<ElFormItem prop="password_confirmation" label="Подтверждение пароля">
				<ElInput
					type="password"
					v-model="form.password_confirmation"
					placeholder="Подтвердите пароль..."
					clearable
				/>
			</ElFormItem>

			<!-- Номер телефона -->
			<ElFormItem prop="phoneNumber" label="Номер телефона">
				<ElInput
					v-model="form.phoneNumber"
					placeholder="Введите номер..."
					clearable
				/>
			</ElFormItem>

			<!-- Должность -->
			<ElFormItem prop="job" label="Должность" style="margin-bottom: 10px">
				<ElInput v-model="form.job" placeholder="Должность..." clearable />
			</ElFormItem>

			<!-- Сообщение об ошибке -->
			<div
				v-if="authStore.message"
				class="bg-red-100 border border-red-400 text-red-700 rounded relative mb-4"
				role="alert"
			>
				<span class="block sm:inline" style="margin-left: 15px">{{
					authStore.message
				}}</span>
				<span class="absolute top-0 bottom-0 right-0 p-4">
					<svg
						@click="authStore.clearError"
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

			<!-- Кнопки -->
			<div class="flex items-center justify-between" style="margin-top: 20px">
				<button
					class="button"
					:disabled="authStore.loading"
					@click.prevent="handleRegister"
					style="margin: 10px 0px; padding: 5px 30px"
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
		</ElForm>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ElForm, ElFormItem, ElInput } from 'element-plus'

const authStore = useAuthStore()

// Реактивная модель формы
const form = ref({
	email: '',
	name: '',
	password: '',
	password_confirmation: '',
	phoneNumber: '',
	job: ''
})

// Ссылка на форму для вызова validate()
const formRef = ref(null)

// Правила валидации
const rules = {
	email: [
		{ required: true, message: 'Пожалуйста, введите Email', trigger: 'blur' },
		{ type: 'email', message: 'Неверный формат', trigger: ['blur', 'change'] }
	],
	name: [
		{ required: true, message: 'Пожалуйста, введите ФИО', trigger: 'blur' }
	],
	password: [
		{ required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' }
	],
	password_confirmation: [
		{
			required: true,
			message: 'Пожалуйста, подтвердите пароль',
			trigger: 'blur'
		},
		{
			validator: (rule, value) => {
				if (value !== form.value.password) {
					return new Error('Пароли должны совпадать')
				}
				return true
			},
			trigger: 'blur'
		}
	],
	phoneNumber: [
		{
			required: true,
			message: 'Пожалуйста, введите номер телефона',
			trigger: 'blur'
		},
		{
			validator: (rule, value) => {
				const digitsRegex = /^[\d\s\-\.\(\)]*$/
				if (!value) {
					return new Error('Пожалуйста, введите номер телефона')
				}
				if (!digitsRegex.test(value)) {
					return new Error('Некорректный формат номера телефона РФ')
				}
				return true
			},
			trigger: 'blur'
		}
	],
	job: []
}

// Обработка регистрации
const handleRegister = () => {
	formRef.value.validate(async valid => {
		if (valid) {
			await authStore.register({
				name: form.value.name,
				email: form.value.email,
				job: form.value.job,
				phoneNumber: form.value.phoneNumber,
				password: form.value.password,
				token: generateToken()
			})

			// Если регистрация прошла успешно (без ошибок)
			if (!authStore.message) {
				// Можно эмитировать событие или выполнить другую логику
				// например, закрыть модальное окно или перейти на другую страницу
				$emit('success')
			}
		} else {
			console.log('Ошибка валидации')
		}
	})
}

// Генерация случайного токена
function generateToken() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const tokenLength = 30
	let token = ''
	for (let i = 0; i < tokenLength; i++) {
		token += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return token
}
</script>
