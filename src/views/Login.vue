<template>
	<div class="wrapper">
		<div class="container">
			<div class="container__header">Sign In</div>

			<input
				class="container__input"
				type="text"
				v-model="username"
				placeholder="Username"
			/>

			<input
				class="container__input"
				type="password"
				v-model="password"
				placeholder="Password"
			/>

			<button class="container__button" @click="submit()">Sign In</button>

			<div class="error" v-if="error">Incorrect Credentials</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			error: false,
			username: "",
			password: "",
		};
	},
	methods: {
		submit() {
			// Reset Error Status
			this.error = false;

			// Attempt Login
			this.$api
				.get("auth/login", {
					auth: {
						username: this.username,
						password: this.password,
					},
				})
				.then((response) => {
					this.$store.dispatch("login", response.data);
					this.$router.replace({ path: "/" });
				})
				.catch(() => {
					this.error = true;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	height: 100vh;
	width: 100vw;
	background: linear-gradient(to right bottom, #3494e6, #ec6ead);
}

.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff;
	padding: 1rem;
	border-radius: 5px;
	width: 400px;
	max-width: 95%;

	&__header {
		display: block;
		text-align: center;
		font-weight: 600;
		font-size: 2rem;
	}

	&__input {
		display: block;
		width: 100%;
		margin: 1rem 0;
		font-size: 1.2rem;
		padding: 0.5rem;
	}

	&__button {
		display: block;
		width: 100%;
		text-align: center;
		padding: 0.5rem;
		color: #dedede;
		cursor: pointer;
		font-weight: 400;
		transition: all 0.4s ease-in-out;
		border: 1px solid transparent;
		background: #667eea;

		&:hover {
			background: #ffffff;
			color: #667eea;
			border: 1px solid #667eea;
		}
	}
}

.error {
	display: block;
	text-align: center;
	font-weight: 400;
	color: #d3494e;
	margin-top: 0.5rem;
}
</style>
