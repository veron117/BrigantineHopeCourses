<template>
	<div>
		<!-- Sidebar -->
		<div class="sidebar">
			<div class="sidebar-header">
				<div class="sidebar-title">
					<i class="fas fa-ship"></i>
					<span>Админ-панель</span>
				</div>
			</div>

			<div class="sidebar-menu">
				<a class="menu-item" @click="router.push('/admin/courses')">
					<i class="fas fa-book"></i>
					<span class="menu-text">Курсы</span>
				</a>
			</div>
		</div>

		<!-- Main Content -->
		<div class="main-content">
			<!-- Top Navigation -->
			<nav class="top-nav">
				<div></div>
				<div class="user-menu">
					<el-button @click="router.push('/')" type="primary" text
						>На главную</el-button
					>
					<el-button @click="authStore.logout()" type="danger" text
						>Выход</el-button
					>
				</div>
			</nav>

			<!-- Page Content -->
			<div class="content-wrapper">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()
</script>

<style scoped>
body {
	min-height: 100vh;
}

/* Sidebar Styles */
.sidebar {
	width: 280px;
	background: var(--sidebar);
	color: var(--white);
	transition: var(--transition);
	position: fixed;
	height: 100vh;
	z-index: 100;
}

.sidebar-header {
	padding: 15px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.sidebar-title {
	font-size: 1.3rem;
	font-weight: 700;
	font-family: 'Montserrat', sans-serif;
	display: flex;
	align-items: center;
}

.sidebar-title i {
	margin-right: 10px;
	color: var(--accent);
}

.sidebar-menu {
	padding: 20px 0;
}

.menu-item {
	padding: 12px 20px;
	display: flex;
	align-items: center;
	color: rgba(255, 255, 255, 0.8);
	text-decoration: none;
	transition: var(--transition);
	border-left: 3px solid transparent;
	cursor: pointer;
}

.menu-item:hover {
	color: var(--white);
	background: rgba(255, 255, 255, 0.05);
}

.menu-item.active {
	color: var(--white);
	background: rgba(255, 255, 255, 0.1);
	border-left: 3px solid var(--accent);
}

.menu-item i {
	width: 24px;
	margin-right: 12px;
	font-size: 1.1rem;
}

.menu-text {
	font-size: 0.95rem;
}

/* Main Content */
.main-content {
	flex: 1;
	margin-left: 280px;
	transition: var(--transition);
}

/* Top Navigation */
.top-nav {
	background: var(--white);
	padding: 15px 25px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: var(--shadow);
	position: sticky;
	top: 0;
	z-index: 90;
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

.content-wrapper {
	padding: 25px;
}

.user-menu button {
	font-size: 1.2rem;
	padding: 10px 15px;
}

/* Responsive Styles */
@media (max-width: 992px) {
	.sidebar {
		width: 80px;
		overflow: hidden;
	}

	.sidebar-title span,
	.menu-text {
		display: none;
	}

	.menu-item {
		justify-content: center;
		padding: 15px;
	}

	.menu-item i {
		margin-right: 0;
		font-size: 1.2rem;
	}

	.main-content {
		margin-left: 80px;
	}
}

@media (max-width: 768px) {
	.search-bar {
		width: 200px;
	}

	.user-name {
		display: none;
	}
}

@media (max-width: 576px) {
	.sidebar {
		transform: translateX(-100%);
		position: fixed;
		z-index: 1000;
	}

	.sidebar.active {
		transform: translateX(0);
	}

	.main-content {
		margin-left: 0;
	}

	.top-nav {
		padding: 15px;
	}

	.search-bar {
		display: none;
	}
}
</style>
