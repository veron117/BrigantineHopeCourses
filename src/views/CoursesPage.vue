<template>
	<div class="container">
		<div class="search-filter">
			<div class="search-box">
				<i class="fas fa-search"></i>
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Поиск курсов..."
					class="search-input"
				/>
			</div>
		</div>

		<div class="course-list">
			<CourseCard
				v-for="course in filteredCourses"
				:key="course.id"
				:id="course.id"
				:title="course.title"
				:annotation="course.annotation"
				:duration="course.duration"
				:count-lessons="course.countLessons"
			/>
		</div>
	</div>
</template>

<script setup>
import CourseCard from '@/components/CourseCard.vue'
import { onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { ref, computed } from 'vue'

// реактивная строка поиска
const searchQuery = ref('')

const coursesStore = useCoursesStore()

const loadCourses = () => {
	coursesStore.fetchCourses()
}

onMounted(() => {
	// Можно автоматически загружать при монтировании компонента
	loadCourses()
})

const { courses, loading, error } = coursesStore
const filteredCourses = computed(() => {
	if (!searchQuery.value) {
		return courses
	}
	return courses.filter(course =>
		course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})
</script>

<style scoped>
.course-list {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 30px;
	margin-top: 20px;
}
.search-filter {
	width: 100%;
	max-width: 800px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.search-box {
	position: relative;
	width: 100%;
}

.search-box input {
	width: 100%;
	padding: 15px 20px 15px 50px;
	border: 2px solid #e9ecef;
	border-radius: 50px;
	font-size: 1rem;
	transition: var(--transition);
	background-color: #f8f9fa;
}

.search-box input:focus {
	border-color: var(--accent);
	outline: none;
	background-color: var(--white);
	box-shadow: 0 0 0 3px rgba(72, 149, 239, 0.2);
}

.search-box i {
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	color: var(--gray);
}

.filter-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
}

.filter-tag {
	padding: 8px 16px;
	background: #f1f3f5;
	border-radius: 50px;
	font-size: 0.9rem;
	cursor: pointer;
	transition: var(--transition);
}

.filter-tag:hover,
.filter-tag.active {
	background: var(--primary);
	color: var(--white);
}
</style>
