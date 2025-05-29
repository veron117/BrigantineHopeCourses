<template>
	<div class="container">
		<h2>Личный кабинет</h2>

		<div class="profile-section flex flex-col sm:flex-row">
			<div class="profile-card md:self-start">
				<img
					src="https://ui-avatars.com/api/?name=Иван+Иванов&background=4361ee&color=fff&size=120"
					alt="Аватар"
					class="profile-avatar"
				/>
				<div class="profile-name">{{ user.name }}</div>
				<div class="profile-position">{{ user.job }}</div>

				<div class="profile-details">
					<div class="profile-detail">
						<i class="fas fa-envelope"></i>
						<span>{{ user.email }}</span>
					</div>
					<div class="profile-detail">
						<i class="fas fa-phone"></i>
						<span>{{ user.phoneNumber }}</span>
					</div>
					<div class="profile-detail">
						<i class="fas fa-calendar-alt"></i>
						<span>Дата регистрации:{{ formatDate(user.createdAt) }}</span>
					</div>
				</div>

				<a
					href="#"
					class="button button-outline"
					@click="authStore.openUserEditModal()"
					>Редактировать профиль</a
				>
			</div>

			<div class="flex flex-col grow">
				<h3 style="text-align: center; margin-bottom: 25px">Избранные курсы</h3>
				<div class="course-list" v-if="favoriteCourses.length > 0">
					<CourseCard
						v-for="course in favoriteCourses"
						:key="course.id"
						:id="course.id"
						:title="course.title"
						:annotation="course.annotation"
						:duration="course.duration"
						:count-lessons="course.countLessons"
					/>
				</div>
				<div v-else class="flex items-center justify-center">
					<el-empty description="Список пуст" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import CourseCard from '@/components/CourseCard.vue'
import { computed } from 'vue'
import { useCoursesStore } from '@/stores/courses'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const coursesStore = useCoursesStore()
const user = computed(() => authStore.user)

const favoriteCourses = computed(() => {
	return coursesStore
		.getFavorites()
		.filter(course => coursesStore.isFavorite(course.id))
})

function formatDate(dateString) {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	return `${day}.${month}.${year}г.`
}
</script>
<style scoped>
h1,
h2,
h3 {
	font-family: 'Montserrat', sans-serif;
	font-weight: 700;
	margin-bottom: 20px;
	text-align: center;
}

h1 {
	font-size: 2.5rem;
	background: linear-gradient(90deg, var(--primary), var(--accent));
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}

h2 {
	font-size: 2rem;
	color: var(--primary);
	margin-bottom: 40px;
	position: relative;
}

h2::after {
	content: '';
	position: absolute;
	bottom: -10px;
	left: 50%;
	transform: translateX(-50%);
	width: 80px;
	height: 4px;
	background: linear-gradient(90deg, var(--primary), var(--accent));
	border-radius: 2px;
}

h3 {
	font-size: 1.5rem;
	color: var(--accent);
	margin-bottom: 40px;
	position: relative;
}

p {
	margin-bottom: 20px;
	max-width: 800px;
	text-align: center;
	font-size: 1.1rem;
	line-height: 1.8;
	color: var(--gray);
}
.profile-section {
	width: 100%;
	max-width: 1000px;
	margin-bottom: 40px;
	gap: 30px;
}
.profile-card {
	background: var(--white);
	border-radius: 12px;
	padding: 30px;
	box-shadow: var(--shadow);
	text-align: center;
	transition: var(--transition);
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.profile-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	border: 5px solid rgba(72, 149, 239, 0.2);
	margin: 0 auto 20px;
	display: block;
}

.profile-name {
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 10px;
}

.profile-position {
	color: var(--gray);
	margin-bottom: 20px;
	font-size: 1rem;
}

.profile-details {
	text-align: left;
	margin-bottom: 25px;
}

.profile-detail {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
}

.profile-detail i {
	width: 24px;
	color: var(--accent);
	margin-right: 10px;
}

.course-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.course-card {
	background: var(--white);
	border-radius: 12px;
	padding: 25px;
	box-shadow: var(--shadow);
	transition: var(--transition);
	border-left: 4px solid var(--accent);
}

.course-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.course-title {
	font-size: 1.2rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 15px;
}

.course-progress {
	margin-bottom: 20px;
}

.progress-bar {
	height: 8px;
	background: #f1f3f5;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 8px;
}

.progress-fill {
	height: 100%;
	background: linear-gradient(90deg, var(--primary), var(--accent));
	border-radius: 4px;
	transition: width 0.6s ease;
}

.progress-text {
	display: flex;
	justify-content: space-between;
	font-size: 0.9rem;
	color: var(--gray);
}

.course-completed {
	display: inline-block;
	background: rgba(76, 201, 240, 0.1);
	color: var(--success);
	padding: 4px 10px;
	border-radius: 50px;
	font-size: 0.8rem;
	font-weight: 600;
	margin-bottom: 15px;
}

.course-date {
	font-size: 0.9rem;
	color: var(--gray);
	margin-bottom: 20px;
}

/* Button Styles */
.button {
	background: linear-gradient(90deg, var(--primary), var(--accent));
	color: var(--white);
	padding: 12px 25px;
	border: none;
	border-radius: 50px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
	text-decoration: none;
	display: inline-block;
	transition: var(--transition);
	box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
	font-family: 'Montserrat', sans-serif;
}

.button:hover {
	background: linear-gradient(90deg, var(--primary-dark), var(--accent));
	transform: translateY(-3px);
	box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
}

.button:active {
	transform: translateY(1px);
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
</style>
