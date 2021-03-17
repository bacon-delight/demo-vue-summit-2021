<template>
	<div class="card">
		<div class="card__header">
			{{ type === "add" ? "Add New Post" : "Edit Post" }}
		</div>
		<input
			class="card__input"
			type="text"
			placeholder="Title"
			v-model="title"
		/>

		<textarea
			class="card__input"
			placeholder="Description"
			v-model="body"
		></textarea>
		<button class="card__button" @click="submit()">Submit</button>
	</div>
</template>

<script>
export default {
	name: "AddEditPost",
	props: ["type", "post"],
	data() {
		return {
			title: "",
			body: "",
		};
	},
	mounted() {
		if (this.post) {
			this.title = this.post.title;
			this.body = this.post.body;
		}
	},
	methods: {
		submit() {
			if (this.type === "add") {
				this.$api
					.post("/posts/", { title: this.title, body: this.body })
					.then((response) => {
						this.$store.dispatch("add", response.data);
						this.title = "";
						this.body = "";
					});
			} else {
				this.$api
					.put("/posts/" + this.post.id, {
						title: this.title,
						body: this.body,
					})
					.then((response) => {
						this.$store.dispatch("update", response.data);
					});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.card {
	width: 600px;
	max-width: 95%;
	margin: 2rem auto;
	box-shadow: 2px 3px 10px rgba(#000, 0.3);
	padding: 1.5rem;
	background: #fff;

	&__header {
		font-size: 2rem;
		font-weight: 600;
		color: #667eea;
	}

	&__input {
		display: block;
		width: 100%;
		margin: 1rem 0;
		padding: 0.5rem;
		border: 1px solid #667eea;
	}

	&__button {
		background: #667eea;
		border: 1px solid #667eea;
		width: 100%;
		color: #fff;
		cursor: pointer;
		text-transform: uppercase;
		padding: 0.5rem;
		transition: all 0.4s ease-in-out;

		&:hover {
			border: 1px solid #667eea;
			background: #fff;
			color: #667eea;
		}
	}
}
</style>
