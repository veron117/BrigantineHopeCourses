<template>
	<footer>
		<p>&copy; 2025 ПРООМИ "Бригантина надежды". Все права защищены.</p>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style scoped>
footer {
	background: linear-gradient(135deg, var(--primary), var(--secondary));
	color: var(--white);
	text-align: center;
	padding: 30px 0;
	margin-top: 50px;
	clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%);
	padding-top: 50px;
}
</style>
