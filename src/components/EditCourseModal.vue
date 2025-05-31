<template>
	<el-dialog
		:model-value="isOpen"
		@update:model-value="$emit('update:isOpen', $event)"
		title="Редактирование курса"
		width="500px"
		:close-on-click-modal="false"
		@close="handleClose"
	>
		<el-form
			ref="formRef"
			:model="form"
			:rules="rules"
			label-position="top"
			@submit.prevent="handleSubmit"
		>
			<el-form-item label="Название курса" prop="title">
				<el-input v-model="form.title" placeholder="Введите название курса" />
			</el-form-item>

			<el-form-item label="Краткое описание" prop="annotation">
				<el-input
					v-model="form.annotation"
					type="textarea"
					:rows="2"
					placeholder="Введите краткое описание курса"
				/>
			</el-form-item>

			<el-form-item label="Полное описание" prop="description">
				<el-input
					v-model="form.description"
					type="textarea"
					:rows="4"
					placeholder="Введите полное описание курса"
				/>
			</el-form-item>

			<el-form-item label="Длительность (в часах)" prop="duration">
				<el-input-number
					v-model="form.duration"
					:min="1"
					:precision="1"
					:step="0.5"
					style="width: 100%"
				/>
			</el-form-item>

			<el-form-item label="Количество уроков" prop="countLessons">
				<el-input-number
					v-model="form.countLessons"
					:min="1"
					:precision="0"
					:step="1"
					style="width: 100%"
				/>
			</el-form-item>
		</el-form>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="handleClose">Отмена</el-button>
				<el-button type="primary" :loading="loading" @click="handleSubmit">
					Сохранить
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
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

const emit = defineEmits(['update:isOpen', 'updated'])

const coursesStore = useCoursesStore()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
	title: '',
	annotation: '',
	description: '',
	duration: 1,
	countLessons: 1
})

// Заполняем форму данными курса при открытии модального окна
watch(
	() => props.course,
	newCourse => {
		if (newCourse) {
			form.title = newCourse.title
			form.annotation = newCourse.annotation
			form.description = newCourse.description
			form.duration = newCourse.duration
			form.countLessons = newCourse.countLessons
		}
	},
	{ immediate: true }
)

const rules = {
	title: [
		{
			required: true,
			message: 'Пожалуйста, введите название курса',
			trigger: 'blur'
		},
		{
			min: 3,
			message: 'Название должно содержать минимум 3 символа',
			trigger: 'blur'
		}
	],
	annotation: [
		{
			required: true,
			message: 'Пожалуйста, введите краткое описание курса',
			trigger: 'blur'
		},
		{
			min: 10,
			max: 200,
			message: 'Краткое описание должно содержать от 10 до 200 символов',
			trigger: 'blur'
		}
	],
	description: [
		{
			required: true,
			message: 'Пожалуйста, введите полное описание курса',
			trigger: 'blur'
		},
		{
			min: 50,
			message: 'Полное описание должно содержать минимум 50 символов',
			trigger: 'blur'
		}
	],
	duration: [
		{
			required: true,
			message: 'Пожалуйста, укажите длительность курса',
			trigger: 'change'
		},
		{
			type: 'number',
			min: 1,
			message: 'Длительность должна быть не менее 1 часа',
			trigger: 'change'
		}
	],
	countLessons: [
		{
			required: true,
			message: 'Пожалуйста, укажите количество уроков',
			trigger: 'change'
		},
		{
			type: 'number',
			min: 1,
			message: 'Количество уроков должно быть не менее 1',
			trigger: 'change'
		}
	]
}

const handleClose = () => {
	emit('update:isOpen', false)
	if (formRef.value) {
		formRef.value.resetFields()
	}
}

const handleSubmit = async () => {
	if (!formRef.value) return

	await formRef.value.validate(async valid => {
		if (valid) {
			loading.value = true
			const { success, error } = await coursesStore.updateCourse(
				props.course.id,
				form
			)

			if (success) {
				ElNotification({
					title: 'Успех',
					message: 'Курс успешно обновлен',
					type: 'success'
				})
				emit('updated')
				handleClose()
			} else {
				ElNotification({
					title: 'Ошибка',
					message: error || 'Произошла ошибка при обновлении курса',
					type: 'error'
				})
			}
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

:deep(.el-input-number .el-input__wrapper) {
	width: 100%;
}
</style>
