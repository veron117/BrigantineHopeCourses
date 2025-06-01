<template>
	<div>
		<div class="header">
			<!--Content before waves-->
			<div class="inner-header flex" style="height: auto">
				<div class="hero-content">
					<h1>Система обучения ПРООМИ "Бригантина надежды"</h1>
					<p>Ваш путь к профессиональному развитию</p>
				</div>
				<div class="profile-icon">
					<template v-if="!authStore.isAuthenticated">
						<div class="signInOut">
							<a @click="authStore.openLoginModal()">Войти</a>
							<a @click="authStore.openRegisterModal()">Регистрация</a>
						</div>
					</template>
					<template v-else>
						<el-dropdown placement="bottom" style="cursor: pointer">
							<el-avatar size="large" src="profileAvatar.png" />
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
										<router-link to="/profile">Личный кабинет</router-link>
									</el-dropdown-item>
									<el-dropdown-item v-if="isAdmin.value">
										<router-link to="/admin/courses">Админ-панель</router-link>
									</el-dropdown-item>
									<el-dropdown-item divided>
										<div style="display: flex; justify-content: center">
											<a @click="handleLogout">Выход</a>
										</div>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</div>
			</div>

			<!--Waves Container-->
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
			<!--Waves end-->
		</div>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router' // Импортируем useRouter для перенаправления после выхода

const authStore = useAuthStore()
const coursesStore = useCoursesStore()
const router = useRouter()

const isAdmin = computed(() => {
	const isAdminRef = ref(false)

	if (authStore.isAuthenticated) {
		authStore.isAdmin().then(result => {
			isAdminRef.value = result
		})
	}

	return isAdminRef
})

const handleLogout = async () => {
	await authStore.logout()
	await coursesStore.clearFavorites()
	// После выхода перенаправляем на главную страницу (или страницу входа)
	router.push({ name: 'home' })
}
</script>

<style scoped>
.header {
	position: relative;
	text-align: center;
	background: linear-gradient(
		60deg,
		rgba(13, 71, 161, 1) 35%,
		rgba(21, 101, 192, 1) 50%,
		rgba(25, 118, 210, 1) 75%,
		rgba(30, 136, 229, 1) 100%
	);
	color: white;
	padding-top: 56px;
}

.inner-header {
	width: 100%;
	margin: 0;
	padding: 24px 0;
}

.flex {
	/*Flexbox for containers*/
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.waves {
	position: relative;
	width: 100%;
	height: 15vh;
	margin-bottom: -7px; /*Fix for safari gap*/
	min-height: 100px;
	max-height: 150px;
}

.content {
	position: relative;
	height: 20vh;
	text-align: center;
	background-color: white;
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
	display: flex;
	align-items: center;
	justify-content: center;
}

.signInOut {
	display: flex;
	justify-content: space-between;
	width: 180px;
}

.signInOut a {
	cursor: pointer;
	color: white;
}

nav {
	background-color: var(--white);
	color: var(--dark);
	padding: 15px 0;
	margin-top: 0px;
	box-shadow: var(--shadow);
}

nav ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	gap: 30px;
}

nav ul li {
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
