<template>
	<Transition name="modal">
		<div v-if="show" class="modal-mask" @click.self="close">
			<div class="modal-wrapper">
				<div class="modal-container">
					<button class="modal-close-button" @click="close">&times;</button>

					<div class="modal-body">
						<slot name="body">default body</slot>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	show: Boolean
})

const emit = defineEmits(['close'])

const close = () => {
	emit('close')
}
</script>

<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center; /* Центрирование по вертикали */
}

.modal-container {
	width: 90%; /* Ширина модального окна */
	max-width: 500px; /* Максимальная ширина */
	margin: auto; /* Центрирование по горизонтали */
	padding: 0px 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
	display: flex;
	flex-direction: column;
	position: relative;
}

.modal-body {
	margin: 20px 0;
	flex-grow: 1; /* Занимает все доступное пространство по вертикали */
	overflow-y: auto; /* Добавляем прокрутку, если содержимое слишком большое */
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
	opacity: 0;
}

.modal-leave-to {
	opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.modal-close-button {
	position: absolute; /* абсолютное позиционирование внутри .modal */
	top: -10px; /* отступ сверху */
	right: 7px; /* отступ справа */
	background: transparent;
	border: none;
	font-size: 34px;
	height: 20px;
	cursor: pointer;
	color: var(--primary-dark);
}

.modal-close-button:hover {
	color: var(--secondary);
}
</style>
