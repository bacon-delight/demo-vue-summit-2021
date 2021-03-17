import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		posts: [],
	},
	mutations: {
		setTokens(state, tokens) {
			localStorage.setItem("accessToken", tokens["access-token"]);
			localStorage.setItem("refreshToken", tokens["refresh-token"]);
		},
		set(state, posts) {
			state.posts = posts;
		},
		add(state, post) {
			state.posts.push(post);
		},
		delete(state, id) {
			state.posts = state.posts.filter((post) => post.id !== id);
		},
		edit(state, id) {
			state.posts.map((post) =>
				post.id === id ? (post.edit = true) : false
			);
		},
		update(state, item) {
			state.posts = state.posts.map((post) =>
				post.id === item.id ? item : post
			);
		},
	},
	actions: {
		login(context, tokens) {
			context.commit("setTokens", tokens);
		},
		set(context, posts) {
			posts.forEach((post) => {
				post.edit = false;
			});
			context.commit("set", posts);
		},
		add(context, post) {
			post.edit = false;
			context.commit("add", post);
		},
		delete(context, id) {
			context.commit("delete", id);
		},
		edit(context, id) {
			context.commit("edit", id);
		},
		update(context, post) {
			post.edit = false;
			context.commit("update", post);
		},
	},
	getters: {
		get(state) {
			return Object.assign([], state.posts).sort((a, b) => {
				return b.id - a.id;
			});
		},
	},
	modules: {},
	strict: true,
});
