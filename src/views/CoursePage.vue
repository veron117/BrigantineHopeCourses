<template>
	<div class="container flex flex-row" v-if="course">
		<div class="flex flex-col sm:flex-row mb-2">
			<div class="instructor-section">
				<div class="instructor-card">
					<img
						src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
						alt="Алексей Петров"
						class="instructor-avatar"
					/>
					<h3 class="instructor-name">Алишер Избасаров</h3>
					<p class="instructor-title">Председатель правления органпизации</p>
					<p class="instructor-bio">
						Является руководителем ПРООМИ "Бригантины надежды" более 25 лет.
						Является многократным участником региональных мероприятий
						посвященных защите прав и интересов людей с ограниченными
						возможностями. Состоит в совете при Минздраве
					</p>
				</div>
			</div>
			<section class="course-hero">
				<div class="course-info">
					<h1 class="course-title">{{ course.title }}</h1>

					<div class="course-meta">
						<div class="meta-item">
							<i class="fas fa-clock"></i>
							<span>Длительность обучения: {{ course.duration }} ч.</span>
						</div>
						<div class="meta-item">
							<i class="fa fa-book"></i>
							<span>Уроков: {{ course.countLessons }}</span>
						</div>
					</div>

					<div class="course-description">
						{{ course.description }}
					</div>

					<div class="course-actions">
						<button
							class="button button-outline"
							@click="coursesStore.toggleFavorite(course.id)"
						>
							<span v-if="coursesStore.isFavorite(course.id)">
								<i class="fas fa-heart"></i>Убрать из избранного
							</span>
							<span v-else>
								<i class="fa-regular fa-heart"></i>Добавить в избранное
							</span>
						</button>
					</div>
				</div>
			</section>
		</div>

		<section class="course-content">
			<div class="modules-section">
				<h2 class="section-title">
					<i class="fas fa-list-ol"></i> Программа курса
				</h2>

				<div class="module">
					<div class="module-header">
						<h3 class="module-title">
							<i class="fas fa-play-circle"></i> Урок 1: Основы коммуникации
						</h3>
					</div>
				</div>

				<div class="module">
					<div class="module-header">
						<h3 class="module-title">
							<i class="fas fa-comments"></i> Урок 2: Деловое общение
						</h3>
						<span>1 ч 10 мин</span>
					</div>
				</div>

				<div class="module">
					<div class="module-header">
						<h3 class="module-title">
							<i class="fas fa-users"></i> Урок 3: Работа в команде
						</h3>
						<span> 45 мин</span>
					</div>
				</div>
			</div>
		</section>
	</div>
	<div v-else class="flex items-center justify-center">
		<el-empty description="Курс не найден" />
	</div>
</template>
<script setup>
import { useCoursesStore } from '@/stores/courses'
import { useRoute } from 'vue-router'

const route = useRoute()
const coursesStore = useCoursesStore()

const course = coursesStore.getCourseById(route.params.id)
</script>
<style scoped>
/* Instructor Section */
.instructor-card {
	display: inline-block;
	background: var(--white);
	border-radius: 12px;
	padding: 30px;
	box-shadow: var(--shadow);
	text-align: center;
}

.instructor-avatar {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	border: 5px solid rgba(72, 149, 239, 0.2);
	margin: 0 auto 20px;
}

.instructor-name {
	font-size: 1.3rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 10px;
}

.instructor-title {
	color: var(--gray);
	margin-bottom: 20px;
}

.instructor-bio {
	line-height: 1.8;
	margin-bottom: 20px;
}

.social-links {
	display: flex;
	justify-content: center;
	gap: 15px;
}
.course-hero {
	display: inline-block;
	gap: 40px;
	margin-bottom: 50px;
	align-items: center;
}

.course-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.course-info {
	padding: 20px;
}

.course-title {
	font-size: 2.2rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 20px;
	font-family: 'Montserrat', sans-serif;
}

.course-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin-bottom: 25px;
}

.meta-item {
	display: flex;
	align-items: center;
	color: var(--gray);
}

.meta-item i {
	margin-right: 8px;
	color: var(--accent);
}

.course-description {
	margin-bottom: 30px;
	line-height: 1.8;
}

/* Button Styles */
.button {
	background: linear-gradient(90deg, var(--primary), var(--accent));
	color: var(--white);
	padding: 15px 30px;
	border: none;
	border-radius: 50px;
	cursor: pointer;
	font-size: 1.1rem;
	font-weight: 600;
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	transition: var(--transition);
	box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
	font-family: 'Montserrat', sans-serif;
}

.button i {
	margin-right: 10px;
}

.button:hover {
	background: linear-gradient(90deg, var(--primary-dark), var(--accent));
	transform: translateY(-3px);
	box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
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

/* Course Content */
.course-content {
	display: flex;
	position: relative;
	width: fit-content;
	height: fit-content;
}

.modules-section {
	background: var(--white);
	border-radius: 12px;
	padding: 70px;
	box-shadow: var(--shadow);
}

.section-title {
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 25px;
	font-family: 'Montserrat', sans-serif;
	display: flex;
	align-items: center;
}

.section-title i {
	margin-right: 15px;
}

.module {
	margin-bottom: 25px;
	border-bottom: 1px solid #f1f3f5;
	padding-bottom: 20px;
}

.module:last-child {
	border-bottom: none;
}

.module-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
	cursor: pointer;
}

.module-title {
	font-size: 1.2rem;
	font-weight: 600;
	color: var(--dark);
	display: flex;
	align-items: center;
}

.module-title i {
	margin-right: 10px;
	color: var(--accent);
}
</style>
