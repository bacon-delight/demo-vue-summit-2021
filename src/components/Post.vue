<template>
	<div class="card">
		<div class="card__header">{{ title }}</div>
		<div class="card__body">
			{{ body }}
		</div>
		<div class="card__button-grid">
			<button class="card__button card__button--edit" @click="editPost()">
				Edit
			</button>
			<button
				class="card__button card__button--delete"
				@click="deletePost()"
			>
				Delete
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Post",
	props: ["id", "title", "body"],
	methods: {
		editPost() {
			this.$store.dispatch("edit", this.id);
		},
		deletePost() {
			this.$api.delete("/posts/" + this.id).then(() => {
				this.$store.dispatch("delete", this.id);
			});
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
	}

	&__body {
	}

	&__button-grid {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
	}

	&__button {
		text-align: center;
		padding: 0.5rem;
		color: #fff;
		cursor: pointer;
		font-weight: 400;
		transition: all 0.4s ease-in-out;
		border: 1px solid transparent;

		&--edit {
			background: #667eea;

			&:hover {
				background: #fff;
				color: #667eea;
				border: 1px solid #667eea;
			}
		}

		&--delete {
			background: #d3494e;

			&:hover {
				background: #fff;
				color: #d3494e;
				border: 1px solid #d3494e;
			}
		}
	}
}
</style>
