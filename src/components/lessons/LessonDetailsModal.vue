<template>
	<el-dialog
		:model-value="isOpen"
		@update:model-value="$emit('update:isOpen', $event)"
		:title="lesson.title"
		width="50%"
		class="lesson-details-modal"
	>
		<div class="lesson-details">
			<div class="detail-item">
				<h3>Описание:</h3>
				<p>{{ lesson.description }}</p>
			</div>
			<div class="detail-item">
				<h3>Ссылка на урок:</h3>
				<a :href="lesson.link" target="_blank" class="lesson-link">
					<i class="fas fa-external-link-alt"></i>
					Открыть урок
				</a>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
defineProps({
	isOpen: {
		type: Boolean,
		required: true
	},
	lesson: {
		type: Object,
		required: true
	}
})

defineEmits(['update:isOpen'])
</script>

<style scoped>
.lesson-details {
	padding: 20px;
}

.detail-item {
	margin-bottom: 20px;
}

.detail-item h3 {
	font-weight: 600;
	margin-bottom: 8px;
	color: var(--primary);
}

.lesson-link {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--accent);
	text-decoration: none;
	transition: var(--transition);
}

.lesson-link:hover {
	color: var(--primary);
}

.lesson-link i {
	font-size: 0.9rem;
}
</style>
