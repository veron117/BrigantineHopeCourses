<template>
	<div>
		<div class="page-header">
			<h1 class="page-title">
				Управление уроками курса:<br />"{{ course?.title }}"
			</h1>
			<div class="page-actions">
				<a class="button" @click="showAddModal = true">
					<i class="fas fa-plus"></i> Добавить урок
				</a>
			</div>
		</div>

		<!-- Lessons Table -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">Список уроков</h2>
				<div class="search-bar">
					<i class="fas fa-search"></i>
					<input type="text" placeholder="Поиск..." v-model="searchQuery" />
				</div>
			</div>

			<div class="table-responsive">
				<table class="table" v-loading="lessonsStore.loading">
					<thead>
						<tr>
							<th>ID</th>
							<th>Название</th>
							<th>Описание</th>
							<th class="w-[170px]">
								<div class="flex justify-center">Ссылка</div>
							</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="lesson in filteredLessons" :key="lesson.id">
							<td>{{ lesson.id }}</td>
							<td>
								<span class="lesson-title" @click="handleTitleClick(lesson)">
									{{ lesson.title }}
								</span>
							</td>
							<td>
								<el-text line-clamp="2">{{ lesson.description }}</el-text>
							</td>
							<td>
								<a
									:href="lesson.link"
									target="_blank"
									class="lesson-link flex justify-center"
								>
									<i class="fas fa-external-link-alt"></i>
									Перейти к уроку
								</a>
							</td>
							<td>
								<div class="flex gap-2 flex-row">
									<a
										class="action-btn edit"
										title="Редактировать"
										@click="handleEditClick(lesson)"
									>
										<i class="fas fa-edit"></i>
									</a>
									<a
										class="action-btn delete"
										title="Удалить"
										@click="handleDeleteClick(lesson)"
									>
										<i class="fas fa-trash"></i>
									</a>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Add Lesson Modal -->
		<AddLessonModal
			v-if="showAddModal"
			v-model:isOpen="showAddModal"
			:courseId="courseId"
			@created="handleLessonCreated"
		/>

		<!-- Edit Lesson Modal -->
		<EditLessonModal
			v-if="showEditModal"
			v-model:isOpen="showEditModal"
			:lesson="selectedLesson"
			@updated="handleLessonUpdated"
		/>

		<!-- Delete Lesson Modal -->
		<DeleteLessonModal
			v-if="showDeleteModal"
			v-model:isOpen="showDeleteModal"
			:lesson="selectedLesson"
			@deleted="handleLessonDeleted"
		/>

		<!-- Lesson Details Modal -->
		<LessonDetailsModal
			v-if="showDetailsModal"
			v-model:isOpen="showDetailsModal"
			:lesson="selectedLesson"
		/>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'
import { useLessonsStore } from '@/stores/lessons'
import AddLessonModal from '@/components/lessons/AddLessonModal.vue'
import EditLessonModal from '@/components/lessons/EditLessonModal.vue'
import DeleteLessonModal from '@/components/lessons/DeleteLessonModal.vue'
import LessonDetailsModal from '@/components/lessons/LessonDetailsModal.vue'

const route = useRoute()
const courseId = computed(() => route.params.courseId)
const coursesStore = useCoursesStore()
const lessonsStore = useLessonsStore()

const searchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showDetailsModal = ref(false)
const selectedLesson = ref(null)

const course = computed(() => {
	return coursesStore.courses.find(c => c.id === courseId.value)
})

const loadLessons = async () => {
	await lessonsStore.fetchLessons(courseId.value)
}

const handleLessonCreated = () => {
	loadLessons()
}

const handleEditClick = lesson => {
	selectedLesson.value = lesson
	showEditModal.value = true
}

const handleLessonUpdated = () => {
	loadLessons()
}

const handleDeleteClick = lesson => {
	selectedLesson.value = lesson
	showDeleteModal.value = true
}

const handleLessonDeleted = () => {
	loadLessons()
}

const handleTitleClick = lesson => {
	selectedLesson.value = lesson
	showDetailsModal.value = true
}

const filteredLessons = computed(() => {
	if (!searchQuery.value) {
		return lessonsStore.lessons
	}
	return lessonsStore.lessons.filter(lesson =>
		lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

onMounted(() => {
	if (!coursesStore.courses.length) {
		coursesStore.fetchCourses()
	}
	loadLessons()
})

onUnmounted(() => {
	lessonsStore.clearLessons()
})
</script>

<style scoped>
.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
}

.page-title {
	font-size: 1.8rem;
	font-weight: 700;
	color: var(--primary);
	font-family: 'Montserrat', sans-serif;
}

.page-actions .button {
	margin-left: 10px;
}

.card {
	background: var(--white);
	border-radius: 10px;
	box-shadow: var(--shadow);
	padding: 20px;
	margin-bottom: 30px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 15px;
	border-bottom: 1px solid #f1f3f5;
}

.card-title {
	font-size: 1.2rem;
	font-weight: 600;
	color: var(--primary);
}

.table-responsive {
	overflow-x: auto;
}

.table {
	width: 100%;
	border-collapse: collapse;
}

.table th {
	background: #f8f9fa;
	padding: 12px 15px;
	text-align: left;
	font-weight: 600;
	color: var(--dark);
	font-size: 0.9rem;
}

.table td {
	padding: 12px 15px;
	border-bottom: 1px solid #f1f3f5;
	font-size: 0.9rem;
}

.table tr:last-child td {
	border-bottom: none;
}

.table tr:hover td {
	background: #f8f9fa;
}

.button {
	background: linear-gradient(90deg, var(--primary), var(--accent));
	color: var(--white);
	padding: 10px 20px;
	border: none;
	border-radius: 50px;
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: 600;
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	transition: var(--transition);
	box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
}

.button i {
	margin-right: 8px;
}

.button:hover {
	background: linear-gradient(90deg, var(--primary-dark), var(--accent));
	transform: translateY(-2px);
	box-shadow: 0 6px 15px rgba(67, 97, 238, 0.4);
}

.action-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: #f8f9fa;
	color: var(--gray);
	transition: var(--transition);
	border: none;
	cursor: pointer;
	margin-right: 5px;
}

.action-btn.edit {
	background: rgba(72, 149, 239, 0.1);
	color: var(--accent);
}

.action-btn.edit:hover {
	background: var(--accent);
	color: var(--white);
}

.action-btn.delete {
	background: rgba(247, 37, 133, 0.1);
	color: var(--danger);
}

.action-btn.delete:hover {
	background: var(--danger);
	color: var(--white);
}

.search-bar {
	position: relative;
	width: 300px;
}

.search-bar input {
	width: 100%;
	padding: 10px 15px 10px 40px;
	border: 1px solid #e9ecef;
	border-radius: 50px;
	font-size: 0.9rem;
	transition: var(--transition);
}

.search-bar input:focus {
	outline: none;
	border-color: var(--accent);
	box-shadow: 0 0 0 3px rgba(72, 149, 239, 0.2);
}

.search-bar i {
	position: absolute;
	left: 15px;
	top: 50%;
	transform: translateY(-50%);
	color: var(--gray);
}

@media (max-width: 768px) {
	.page-header {
		flex-direction: column;
		align-items: flex-start;
	}

	.page-actions {
		margin-top: 15px;
		width: 100%;
	}

	.page-actions .button {
		width: 100%;
		margin-left: 0;
		margin-bottom: 10px;
	}

	.search-bar {
		width: 200px;
	}
}

@media (max-width: 576px) {
	.card-header {
		flex-direction: column;
		gap: 15px;
	}

	.search-bar {
		width: 100%;
	}
}

.lesson-link {
	align-items: center;
	gap: 8px;
	color: var(--accent);
	text-decoration: none;
	font-size: 0.9rem;
	transition: var(--transition);
}

.lesson-link:hover {
	color: var(--primary);
}

.lesson-link i {
	font-size: 0.8rem;
}

.lesson-title {
	cursor: pointer;
	color: var(--primary);
	transition: var(--transition);
}

.lesson-title:hover {
	color: var(--accent);
	text-decoration: underline;
}
</style>
