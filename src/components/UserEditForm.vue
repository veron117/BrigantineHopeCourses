<template>
	<ElForm
		v-if="!authStore.message"
		@submit.prevent="handleSubmit"
		labelWidth="auto"
		labelPosition="top"
		size="large"
	>
		<!-- Имя -->
		<ElFormItem label="Имя" prop="name" style="margin-bottom: 10px">
			<ElInput
				v-model="formData.name"
				placeholder="Введите имя"
				clearable
				required
			/>
		</ElFormItem>

		<!-- Работа -->
		<ElFormItem label="Работа" prop="job" style="margin-bottom: 10px">
			<ElInput
				v-model="formData.job"
				placeholder="Введите должность"
				clearable
			/>
		</ElFormItem>

		<!-- Телефон -->
		<ElFormItem label="Телефон" prop="phoneNumber" style="margin-bottom: 10px">
			<ElInput
				v-model="formData.phoneNumber"
				type="tel"
				placeholder="Введите номер телефона"
				clearable
			/>
		</ElFormItem>

		<!-- Кнопка -->
		<div class="flex items-center justify-between" style="margin-top: 20px">
			<button
				type="submit"
				class="button"
				style="margin: 10px 0px; padding: 5px 30px"
			>
				Сохранить
			</button>
		</div>
	</ElForm>
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
