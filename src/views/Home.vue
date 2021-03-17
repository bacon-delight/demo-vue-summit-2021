<template>
	<div class="wrapper">
		<AddEditPost type="add" />
		<div class="container">
			<div class="container__header">Earlier Posts</div>
			<div class="container__cards" v-for="post in posts" :key="post.id">
				<Post
					v-if="!post.edit"
					:id="post.id"
					:title="post.title"
					:body="post.body"
				/>
				<AddEditPost v-else type="edit" :post="post" />
			</div>
		</div>
	</div>
</template>

<script>
import AddEditPost from "@/components/AddEditPost.vue";
import Post from "@/components/Post.vue";
import { mapGetters } from "vuex";
export default {
	name: "Home",
	components: {
		AddEditPost,
		Post,
	},
	computed: {
		...mapGetters({
			posts: "get",
		}),
	},
	mounted() {
		this.$api
			.get("posts/")
			.then((response) => this.$store.dispatch("set", response.data))
			.catch(() => {});
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	font-size: 1.6rem;
	padding: 2rem 0;
	background: #dedede;
	height: 100vh;
	overflow-y: scroll;
}

.container {
	&__header {
		width: 600px;
		max-width: 95%;
		margin: 3rem auto 0;
		font-size: 2rem;
		font-weight: 600;
		color: #667eea;
	}
}
</style>
