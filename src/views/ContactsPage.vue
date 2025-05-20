<template>
	<div class="container">
		<h2>Наши контакты</h2>
		<p>
			Свяжитесь с нами любым удобным способом. Мы всегда рады помочь вам с
			вопросами о наших курсах и программах обучения.
		</p>

		<div class="contact-container">
			<div class="contact-card">
				<div class="contact-icon">
					<i class="fas fa-map-marker-alt"></i>
				</div>
				<h3 class="contact-title">Адрес</h3>
				<p class="contact-info">
					440018, г. Пенза,<br />
					ул. Ворошилова, д. 18А, офис 3
				</p>
				<a href="#" class="contact-link">Как добраться →</a>
			</div>

			<div class="contact-card">
				<div class="contact-icon">
					<i class="fas fa-phone-alt"></i>
				</div>
				<h3 class="contact-title">Телефоны</h3>
				<p class="contact-info">
					+7 (902) 203-77-99<br />
					+7 (8412) 68-51-30
				</p>
				<p class="contact-info">
					Пн-Пт: 9:00 - 18:00<br />
					Сб-Вс: выходной
				</p>
			</div>

			<div class="contact-card">
				<div class="contact-icon">
					<i class="fas fa-envelope"></i>
				</div>
				<h3 class="contact-title">Электронная почта</h3>
				<p class="contact-info">
					Общие вопросы:<br />
					<a href="mailto:707799@gmail.com" class="contact-link"
						>707799@gmail.com</a
					>
				</p>
			</div>
		</div>

		<div class="map-container">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.6366368728745!2d44.99177537695313!3d53.20643257224902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41410106e398048f%3A0xc113d74b0f09d75f!2z0YPQuy4g0JLQvtGA0L7RiNC40LvQvtCy0LAsIDE40LAsINCf0LXQvdC30LAsINCf0LXQvdC30LXQvdGB0LrQsNGPINC-0LHQuy4sIDQ0MDAwOA!5e0!3m2!1sru!2sru!4v1746554944804!5m2!1sru!2sru"
				width="600"
				height="450"
				style="border: 0"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>
</template>
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

p {
	margin-bottom: 20px;
	max-width: 800px;
	text-align: center;
	font-size: 1.1rem;
	line-height: 1.8;
	color: var(--gray);
}
.contact-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 30px;
	width: 100%;
	margin-bottom: 40px;
}

.contact-card {
	background: var(--white);
	border-radius: 12px;
	padding: 30px;
	box-shadow: var(--shadow);
	transition: var(--transition);
	text-align: center;
	border-top: 4px solid var(--accent);
}

.contact-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.contact-icon {
	font-size: 2.5rem;
	color: var(--accent);
	margin-bottom: 20px;
}

.contact-title {
	font-size: 1.3rem;
	font-weight: 700;
	color: var(--primary);
	margin-bottom: 15px;
}

.contact-info {
	color: var(--gray);
	margin-bottom: 20px;
	line-height: 1.8;
}

.contact-link {
	color: var(--primary);
	text-decoration: none;
	font-weight: 600;
	transition: var(--transition);
	display: inline-block;
	margin-top: 10px;
}

.contact-link:hover {
	color: var(--secondary);
	text-decoration: underline;
}

/* Contact Form */
.contact-form {
	width: 100%;
	max-width: 800px;
	background: var(--white);
	border-radius: 12px;
	padding: 40px;
	box-shadow: var(--shadow);
	margin-top: 20px;
}

.form-group {
	margin-bottom: 25px;
}

.form-group label {
	display: block;
	margin-bottom: 8px;
	font-weight: 600;
	color: var(--dark);
	font-family: 'Montserrat', sans-serif;
}

.form-control {
	width: 100%;
	padding: 15px;
	border: 2px solid #e9ecef;
	border-radius: 8px;
	font-size: 1rem;
	transition: var(--transition);
	background-color: #f8f9fa;
}

.form-control:focus {
	border-color: var(--accent);
	outline: none;
	background-color: var(--white);
	box-shadow: 0 0 0 3px rgba(72, 149, 239, 0.2);
}

textarea.form-control {
	min-height: 150px;
	resize: vertical;
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
	display: inline-block;
	margin-top: 10px;
	transition: var(--transition);
	box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
	font-family: 'Montserrat', sans-serif;
	width: 100%;
}

.button:hover {
	background: linear-gradient(90deg, var(--primary-dark), var(--accent));
	transform: translateY(-3px);
	box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
}

.button:active {
	transform: translateY(1px);
}

/* Map */
.map-container {
	width: 100%;
	height: 400px;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: var(--shadow);
	margin-top: 40px;
}

.map-container iframe {
	width: 100%;
	height: 100%;
	border: none;
}
</style>
