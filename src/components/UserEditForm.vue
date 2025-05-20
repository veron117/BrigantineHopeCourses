<template>
	<form @submit.prevent="handleSubmit" v-if="!authStore.message">
		<div>
			<label for="name">Имя:</label>
			<input
				id="name"
				v-model="formData.name"
				type="text"
				placeholder="Введите имя"
				required
			/>
		</div>

		<div>
			<label for="job">Работа:</label>
			<input
				id="job"
				v-model="formData.job"
				type="text"
				placeholder="Введите должность"
			/>
		</div>

		<div>
			<label for="phoneNumber">Телефон:</label>
			<input
				id="phoneNumber"
				v-model="formData.phoneNumber"
				type="tel"
				placeholder="Введите номер телефона"
			/>
		</div>

		<button type="submit">Сохранить</button>
	</form>
	<div v-else>
		{{ authStore.message }}
		<button @click="authStore.closeModal()">Хорошо</button>
	</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = authStore.user

authStore.clearError()
const formData = reactive({
	name: user.name,
	job: user.job,
	phoneNumber: user.phoneNumber
})

function handleSubmit() {
	authStore.editProfile(user.id, { ...formData })
}
</script>
