<template>
	<div class="container">
		<h2>Добро пожаловать!</h2>
		<p>
			Мы рады приветствовать вас на платформе онлайн-обучения "Бригантина
			надежды". Наша миссия - предоставить вам доступ к качественному и
			современному образованию, которое поможет вам достичь новых вершин в вашей
			карьере.
		</p>

		<div class="features">
			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-graduation-cap"></i>
				</div>
				<h3>Качественные курсы</h3>
				<p>
					Программы, разработанные с учетом последних тенденций и требований
					рынка труда.
				</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-chart-line"></i>
				</div>
				<h3>Отслеживание прогресса</h3>
				<p>Удобные инструменты для мониторинга ваших успехов и достижений.</p>
			</div>

			<div class="feature-card">
				<div class="feature-icon">
					<i class="fas fa-users"></i>
				</div>
				<h3>Сообщество</h3>
				<p>Возможность общения с другими учащимися и преподавателями.</p>
			</div>
		</div>

		<p>
			С нами вы сможете раскрыть свой потенциал, получить необходимые знания и
			навыки, и стать ценным специалистом в выбранной области. Наши
			преподаватели - это профессионалы своего дела, готовые поделиться с вами
			своими знаниями и опытом.
		</p>

		<a @click="authStore.openRegisterModal()" class="button">
			Зарегистрироваться
		</a>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router' // Импортируем useRouter для перенаправления после выхода

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
	await authStore.logout()
	// После выхода перенаправляем на главную страницу (или страницу входа)
	router.push({ name: 'home' })
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
}

p {
	margin-bottom: 20px;
	max-width: 800px;
	text-align: center;
	font-size: 1.1rem;
	line-height: 1.8;
	color: var(--gray);
}
</style>
