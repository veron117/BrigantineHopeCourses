<template>
	<div>
		<ElForm
			v-loading="authStore.loading"
			v-if="!authStore.message"
			@submit.prevent="handleSubmit"
			labelWidth="auto"
			labelPosition="top"
			size="large"
		>
			<ElFormItem label="Имя" prop="name" style="margin-bottom: 10px">
				<ElInput
					v-model="formData.name"
					placeholder="Введите имя"
					clearable
					required
				/>
			</ElFormItem>

			<ElFormItem label="Работа" prop="job" style="margin-bottom: 10px">
				<ElInput
					v-model="formData.job"
					placeholder="Введите должность"
					clearable
				/>
			</ElFormItem>

			<ElFormItem
				label="Телефон"
				prop="phoneNumber"
				style="margin-bottom: 10px"
			>
				<ElInput
					v-model="formData.phoneNumber"
					type="tel"
					placeholder="Введите номер телефона"
					clearable
				/>
			</ElFormItem>

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
	</div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
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

const handleSubmit = async () => {
	const status = await authStore.editProfile(user.id, { ...formData })

	if (status === 200) {
		authStore.closeModal()
		openNotification('success', 'Успех', 'Профиль успешно обновлен')
	} else {
		openNotification('error', 'Ошибка', authStore.message, 0)
	}
}

const openNotification = (type, title, message, duration) => {
	ElNotification({
		title: title,
		message: message,
		position: 'top-left',
		offset: 100,
		type: type,
		duration: duration ?? 2000,
		zIndex: 201
	})
}
</script>
