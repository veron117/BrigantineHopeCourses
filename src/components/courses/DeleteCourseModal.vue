<template>
	<el-dialog
		:model-value="isOpen"
		@update:model-value="$emit('update:isOpen', $event)"
		title="Удаление курса"
		width="400px"
		:close-on-click-modal="false"
	>
		<div class="delete-confirmation">
			<i class="fas fa-exclamation-triangle warning-icon"></i>
			<p>Вы действительно хотите удалить курс "{{ course?.title }}"?</p>
			<p class="warning-text">Это действие нельзя будет отменить.</p>
		</div>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="$emit('update:isOpen', false)">Отмена</el-button>
				<el-button type="danger" :loading="loading" @click="handleDelete">
					Удалить
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useCoursesStore } from '@/stores/courses'

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true
	},
	course: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:isOpen', 'deleted'])

const coursesStore = useCoursesStore()
const loading = ref(false)

const handleDelete = async () => {
	loading.value = true
	const { success, error } = await coursesStore.deleteCourse(props.course.id)

	if (success) {
		ElNotification({
			title: 'Успех',
			message: 'Курс успешно удален',
			type: 'success'
		})
		emit('deleted')
		emit('update:isOpen', false)
	} else {
		ElNotification({
			title: 'Ошибка',
			message: error || 'Произошла ошибка при удалении курса',
			type: 'error'
		})
	}
	loading.value = false
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
