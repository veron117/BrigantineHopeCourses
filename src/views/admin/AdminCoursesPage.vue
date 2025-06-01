<template>
	<div>
		<div class="page-header">
			<h1 class="page-title">Управление курсами</h1>
			<div class="page-actions">
				<a class="button" @click="showAddModal = true">
					<i class="fas fa-plus"></i> Добавить курс
				</a>
			</div>
		</div>

		<!-- Courses Table -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">Список курсов</h2>
				<div class="search-bar">
					<i class="fas fa-search"></i>
					<input type="text" placeholder="Поиск..." v-model="searchQuery" />
				</div>
			</div>

			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Название</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="course in filteredCourses" :key="course.id">
							<td>{{ course.id }}</td>
							<td>{{ course.title }}</td>
							<td>
								<a
									class="action-btn lessons"
									title="Уроки"
									@click="navigateToLessons(course)"
								>
									<i class="fas fa-book"></i>
								</a>
								<a
									class="action-btn edit"
									title="Редактировать"
									@click="handleEditClick(course)"
								>
									<i class="fas fa-edit"></i>
								</a>
								<button
									class="action-btn delete"
									title="Удалить"
									@click="handleDeleteClick(course)"
								>
									<i class="fas fa-trash"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Add Course Modal -->
		<AddCourseModal
			v-model:isOpen="showAddModal"
			@created="handleCourseCreated"
		/>

		<!-- Edit Course Modal -->
		<EditCourseModal
			v-model:isOpen="showEditModal"
			:course="selectedCourse"
			@updated="handleCourseUpdated"
		/>

		<!-- Delete Course Modal -->
		<DeleteCourseModal
			v-model:isOpen="showDeleteModal"
			:course="selectedCourse"
			@deleted="handleCourseDeleted"
		/>
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'
import AddCourseModal from '@/components/courses/AddCourseModal.vue'
import EditCourseModal from '@/components/courses/EditCourseModal.vue'
import DeleteCourseModal from '@/components/courses/DeleteCourseModal.vue'

const coursesStore = useCoursesStore()
const router = useRouter()
const searchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedCourse = ref(null)

const loadCourses = () => {
	coursesStore.fetchCourses()
}

const handleCourseCreated = course => {
	loadCourses()
}

const handleEditClick = course => {
	selectedCourse.value = course
	showEditModal.value = true
}

const handleCourseUpdated = () => {
	loadCourses()
}

const handleDeleteClick = course => {
	selectedCourse.value = course
	showDeleteModal.value = true
}

const handleCourseDeleted = () => {
	loadCourses()
}

const navigateToLessons = course => {
	router.push(`/admin/courses/${course.id}/lessons`)
}

onMounted(() => {
	loadCourses()
})

const filteredCourses = computed(() => {
	if (!searchQuery.value) {
		return coursesStore.courses
	}
	return coursesStore.courses.filter(course =>
		course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
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

/* Card Styles */
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

/* Table Styles */
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

/* Button Styles */
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

.button:active {
	transform: translateY(0);
}

.button-outline {
	background: transparent;
	border: 2px solid var(--primary);
	color: var(--primary);
	box-shadow: none;
}

.button-outline:hover {
	background: rgba(67, 97, 238, 0.1);
	color: var(--primary-dark);
}

.button-sm {
	padding: 6px 12px;
	font-size: 0.8rem;
}

/* Action Buttons */
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

.action-btn.lessons {
	background: rgba(52, 211, 153, 0.1);
	color: #34d399;
}

.action-btn.lessons:hover {
	background: #34d399;
	color: var(--white);
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

/* Search Bar Styles */
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
</style>
