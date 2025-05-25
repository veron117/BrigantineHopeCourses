<template>
	<div>
		<ElForm labelWidth="auto" labelPosition="top" size="large">
			<ElFormItem
				prop="email"
				label="Email"
				:rules="[
					{
						type: 'email',
						message: 'Неверный формат',
						trigger: ['blur', 'change']
					}
				]"
			>
				<ElInput
					v-model="email"
					placeholder="Логин...."
					clearable
					autocomplete="email"
				/>
			</ElFormItem>

			<ElFormItem label="Пароль" prop="pass" style="margin-bottom: 10px">
				<ElInput placeholder="Пароль...." type="password" v-model="password" />
			</ElFormItem>
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

			<div class="flex items-center justify-between">
				<button
					class="button"
					:disabled="authStore.loading"
					@click.prevent="handleLogin"
					style="margin: 10px 0px; padding: 5px 30px"
				>
					<span v-if="authStore.loading">Загрузка...</span>
					<span v-else>Войти</span>
				</button>
				<a
					href="#"
					@click.prevent="$emit('switch-to-register')"
					class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				>
					Нет аккаунта? Зарегистрироваться
				</a>
			</div>
		</ElForm>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCoursesStore } from '@/stores/courses'
import { ElForm, ElFormItem, ElInput } from 'element-plus'

const authStore = useAuthStore()
const coursesStore = useCoursesStore()

const email = ref('')
const password = ref('')

// Определяем события, которые компонент может излучать
const emit = defineEmits(['success', 'switch-to-register'])

const handleLogin = async () => {
	await authStore.login(email.value, password.value)

	// Если вход успешен и нет ошибки
	if (authStore.isAuthenticated && !authStore.message) {
		await coursesStore.setFavorites(authStore.user.favoriteCourses)
		emit('success') // Излучаем событие 'success'
	}
}

// Очищаем ошибку и поля формы при монтировании (или при открытии модального окна)
onMounted(() => {
	authStore.clearError()
	email.value = ''
	password.value = ''
})

// watch(
// 	() => props.show,
// 	newVal => {
// 		if (newVal) {
// 			authStore.clearError()
// 			email.value = ''
// 			password.value = ''
// 		}
// 	}
// )
</script>
