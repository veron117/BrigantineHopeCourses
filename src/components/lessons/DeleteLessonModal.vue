<template>
	<el-dialog
		:model-value="isOpen"
		@update:model-value="emit('update:isOpen', $event)"
		title="Удалить урок"
		width="30%"
		@close="handleClose"
	>
		<div class="delete-confirmation">
			<i class="fas fa-exclamation-triangle warning-icon"></i>
			<p>Вы действительно хотите удалить урок "{{ lesson?.title }}"?</p>
			<p class="warning-text">Это действие нельзя будет отменить.</p>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Отмена</el-button>
				<el-button type="danger" @click="handleSubmit" :loading="loading">
					<template #icon>
						<el-icon><Delete /></el-icon>
					</template>
					{{ loading ? 'Удаление...' : 'Удалить' }}
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useLessonsStore } from '@/stores/lessons'

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true
	},
	lesson: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:isOpen', 'deleted'])

const lessonsStore = useLessonsStore()
const loading = ref(false)

const handleClose = () => {
	emit('update:isOpen', false)
}

const handleSubmit = async () => {
	loading.value = true
	try {
		await lessonsStore.deleteLesson(props.lesson.id)
		ElNotification({
			title: 'Успех',
			message: `Урок "${props.lesson.title}" успешно удален`,
			type: 'success'
		})
		emit('deleted')
		handleClose()
	} catch (error) {
		console.error('Failed to delete lesson:', error)
		ElNotification({
			title: 'Ошибка',
			message: 'Не удалось удалить урок. Попробуйте позже.',
			type: 'error'
		})
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.delete-confirmation {
	text-align: center;
	padding: 20px 0;
}

.warning-icon {
	font-size: 48px;
	color: var(--danger);
	margin-bottom: 20px;
}

.warning-text {
	color: var(--gray);
	font-size: 0.9rem;
	margin-top: 10px;
}

.dialog-footer {
	display: flex;
	justify-content: flex-end;
	gap: 12px;
}
</style>
