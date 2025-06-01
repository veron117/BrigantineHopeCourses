<template>
	<el-dialog
		:model-value="isOpen"
		@update:model-value="emit('update:isOpen', $event)"
		title="Добавить урок"
		width="50%"
		@close="handleClose"
	>
		<el-form
			ref="formRef"
			:model="formData"
			@submit.prevent="handleSubmit"
			label-position="top"
		>
			<el-form-item
				label="Название урока"
				prop="title"
				:rules="[{ required: true, message: 'Название урока обязательно' }]"
			>
				<el-input v-model="formData.title" />
			</el-form-item>

			<el-form-item
				label="Описание"
				prop="description"
				:rules="[{ required: true, message: 'Описание обязательно' }]"
			>
				<el-input v-model="formData.description" type="textarea" :rows="3" />
			</el-form-item>

			<el-form-item
				label="Ссылка на урок"
				prop="link"
				:rules="[
					{ required: true, message: 'Ссылка обязательна' },
					{ type: 'url', message: 'Введите корректный URL' }
				]"
			>
				<el-input v-model="formData.link" placeholder="https://">
					<template #prefix>
						<el-icon><Link /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Отмена</el-button>
				<el-button type="primary" @click="handleSubmit" :loading="loading">
					<template #icon>
						<el-icon><DocumentAdd /></el-icon>
					</template>
					{{ loading ? 'Сохранение...' : 'Сохранить' }}
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentAdd, Link } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useLessonsStore } from '@/stores/lessons'

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true
	},
	courseId: {
		type: [String, Number],
		required: true
	}
})

const emit = defineEmits(['update:isOpen', 'created'])

const lessonsStore = useLessonsStore()
const loading = ref(false)
const formRef = ref(null)

const formData = ref({
	title: '',
	description: '',
	link: ''
})

const handleClose = () => {
	emit('update:isOpen', false)
	formData.value = {
		title: '',
		description: '',
		link: ''
	}
	if (formRef.value) {
		formRef.value.resetFields()
	}
}

const handleSubmit = async () => {
	if (!formRef.value) return

	await formRef.value.validate(async valid => {
		if (!valid) return

		loading.value = true
		try {
			await lessonsStore.createLesson(props.courseId, formData.value)
			ElNotification({
				title: 'Успех',
				message: 'Урок успешно создан',
				type: 'success'
			})
			emit('created')
			handleClose()
		} catch (error) {
			console.error('Failed to create lesson:', error)
			ElNotification({
				title: 'Ошибка',
				message: 'Не удалось создать урок. Попробуйте позже.',
				type: 'error'
			})
		} finally {
			loading.value = false
		}
	})
}
</script>

<style scoped>
.dialog-footer {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
}
</style>
