<template>
	<div class="course-item">
		<div
			class="course-badge button-outline"
			@click="coursesStore.toggleFavorite(id)"
			v-if="authStore.isAuthenticated"
		>
			<i class="fas fa-heart" v-if="coursesStore.isFavorite(id)"></i>
			<i class="fa-regular fa-heart" v-else></i>
		</div>
		<h3>{{ title }}</h3>
		<p>{{ annotation }}</p>
		<div class="course-meta">
			<span><i class="far fa-clock"></i>Длительность: {{ duration }} ч.</span>
			<span><i class="fa fa-book"></i>Уроков: {{ countLessons }}</span>
		</div>
		<router-link
			:to="`/courses/${id}`"
			class="button"
			v-if="authStore.isAuthenticated"
			>Открыть курс</router-link
		>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCoursesStore } from '@/stores/courses'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const coursesStore = useCoursesStore()

onMounted(async () => {
	if (authStore.isAuthenticated) {
		await authStore.fetchUser()
		if (authStore.user?.favoriteCourses) {
			coursesStore.setFavorites(authStore.user.favoriteCourses)
		}
	}
})

defineProps(['id', 'title', 'duration', 'countLessons', 'annotation'])
</script>

<style scoped>
.course-item {
	background: var(--white);
	border-radius: 12px;
	padding: 30px;
	box-shadow: var(--shadow);
	transition: var(--transition);
	position: relative;
	overflow: hidden;
	border: 1px solid rgba(0, 0, 0, 0.05);
}

.course-item:hover {
	transform: translateY(-10px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.course-item h3 {
	color: var(--primary);
	margin-bottom: 15px;
	text-align: left;
	font-size: 1.5rem;
}

.course-item p {
	text-align: left;
	color: var(--gray);
	margin-bottom: 20px;
}

.course-meta {
	display: flex;
	align-items: center;
	margin-bottom: 25px;
	color: var(--gray);
	font-size: 0.9rem;
}

.course-meta i {
	margin-right: 8px;
	color: var(--accent);
}

.course-meta span {
	margin-right: 20px;
	display: flex;
	align-items: center;
}

.course-badge {
	position: absolute;
	top: 5px;
	right: 5px;
}

.button-outline {
	width: 25px;
	height: 25px;
	background: transparent;
	border: none;
	color: var(--primary);
	cursor: pointer;
	font-size: 1.1rem;
	font-weight: 600;
	text-decoration: none;
	display: inline-block;
	transition: var(--transition);

	font-family: 'Montserrat', sans-serif;
}
</style>
