<template>
	<div>
		<Header />

		<main>
			<router-view />
		</main>

		<Modal :show="authStore.isModalOpen" @close="authStore.closeModal()">
			<template #body>
				<LoginForm
					v-if="authStore.modalType === 'login'"
					@success="authStore.closeModal()"
					@switch-to-register="authStore.openRegisterModal()"
				/>
				<RegisterForm
					v-if="authStore.modalType === 'register'"
					@success="authStore.closeModal()"
					@switch-to-login="authStore.openLoginModal()"
				/>
				<UserEditForm
					v-if="authStore.modalType === 'userEdit'"
					@success="authStore.closeModal"
				/>
			</template>
		</Modal>

		<Footer />
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue' // Импортируем компонент модального окна
import LoginForm from '@/components/LoginForm.vue' // Импортируем компонент формы входа
import RegisterForm from '@/components/RegisterForm.vue' // Импортируем компонент формы регистрации
import UserEditForm from '@/components/UserEditForm.vue'
import Footer from '@/components/Footer.vue' // Импортируем компонент подвала
import { useAuthStore } from '@/stores/auth' // Импортируем Pinia Store

const authStore = useAuthStore()
</script>
<style>
main {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
