<template>
	<div>
		<header>
			<div class="hero-content">
				<h1>Система обучения ПРООМИ "Бригантина надежды"</h1>
				<p>Ваш путь к профессиональному развитию</p>
			</div>
			<template v-if="!authStore.isAuthenticated">
				<button @click="authStore.openLoginModal()">Войти</button>
				<button @click="authStore.openRegisterModal()">Регистрация</button>
			</template>
			<template v-else>
				<router-link to="/profile">
					<span class="mr-4"
						>Привет, {{ authStore.user?.name || 'Пользователь' }}!</span
					>
				</router-link>
				<button
					@click="handleLogout"
					class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
				>
					Выход
				</button>
			</template>
			<div>
				<svg
					class="waves"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 24 150 28"
					preserveAspectRatio="none"
					shape-rendering="auto"
				>
					<defs>
						<path
							id="gentle-wave"
							d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
						/>
					</defs>
					<g class="parallax">
						<use
							xlink:href="#gentle-wave"
							x="48"
							y="0"
							fill="rgba(255,255,255,0.7"
						/>
						<use
							xlink:href="#gentle-wave"
							x="48"
							y="3"
							fill="rgba(255,255,255,0.5)"
						/>
						<use
							xlink:href="#gentle-wave"
							x="48"
							y="5"
							fill="rgba(255,255,255,0.3)"
						/>
						<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
					</g>
				</svg>
			</div>
		</header>
		<nav>
			<ul>
				<li><router-link to="/">Главная</router-link></li>
				<li><router-link to="/courses">Курсы</router-link></li>
				<li><router-link to="/contacts">Контакты</router-link></li>
			</ul>
		</nav>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCoursesStore } from '@/stores/courses'
import { useRouter } from 'vue-router' // Импортируем useRouter для перенаправления после выхода

const authStore = useAuthStore()
const coursesStore = useCoursesStore()
const router = useRouter()

const handleLogout = async () => {
	await authStore.logout()
	await coursesStore.clearFavorites()
	// После выхода перенаправляем на главную страницу (или страницу входа)
	router.push({ name: 'home' })
}
</script>

<style scoped>
header {
	background: linear-gradient(135deg, var(--primary), var(--secondary));
	color: var(--white);
	padding: 30px 0;
	text-align: center;
	box-shadow: var(--shadow);
	position: relative;
	clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
	padding-bottom: 60px;
}

h1 {
	margin: 0;
	font-size: 2.8rem;
	background: none;
	-webkit-background-clip: initial;
	background-clip: initial;
}

p {
	color: rgba(255, 255, 255, 0.9);
	font-size: 1.2rem;
	max-width: 800px;
	margin: 10px auto 0;
}

.profile-icon {
	position: absolute;
	top: 30px;
	right: 30px;
	font-size: 1.8rem;
	color: var(--white);
	text-decoration: none;
	transition: var(--transition);
	background: rgba(255, 255, 255, 0.2);
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.profile-icon:hover {
	background: rgba(255, 255, 255, 0.3);
	transform: scale(1.1);
}

nav {
	background-color: var(--white);
	color: var(--dark);
	padding: 15px 0;
	margin-top: 0px;
	box-shadow: var(--shadow);
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	gap: 30px;
}

li {
	position: relative;
}

a {
	color: var(--dark);
	text-decoration: none;
	font-weight: 600;
	font-family: 'Montserrat', sans-serif;
	font-size: 1.1rem;
	transition: var(--transition);
	padding: 5px 0;
}

a:hover {
	color: var(--primary);
}

a::after {
	content: '';
	position: absolute;
	width: 0;
	height: 2px;
	bottom: 0;
	left: 0;
	background-color: var(--primary);
	transition: var(--transition);
}

a:hover::after {
	width: 100%;
}
.parallax > use {
	animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
	animation-delay: -2s;
	animation-duration: 7s;
}
.parallax > use:nth-child(2) {
	animation-delay: -3s;
	animation-duration: 10s;
}
.parallax > use:nth-child(3) {
	animation-delay: -4s;
	animation-duration: 13s;
}
.parallax > use:nth-child(4) {
	animation-delay: -5s;
	animation-duration: 20s;
}
@keyframes move-forever {
	0% {
		transform: translate3d(-90px, 0, 0);
	}
	100% {
		transform: translate3d(85px, 0, 0);
	}
}
</style>
