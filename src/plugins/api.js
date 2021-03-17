import axios from "axios";
import router from "../router";

const retryLimit = 3;
const baseURL = "https://bacon-delight-demo-flask-apis.herokuapp.com/";

var api = axios.create({
	baseURL: baseURL,
});

// Request Interceptor
api.interceptors.request.use((config) => {
	// Fetch Access Token
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		config.headers.common["Authorization"] = "Bearer " + accessToken;
	}

	// Set Max Retries
	if (!config.__retry) {
		config.__retry = 0;
	}

	return config;
});

// Response Interceptor
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Store Original Request Details
		const originalRequest = error.config;

		// Control Retries
		if (originalRequest.__retry < retryLimit) {
			// Increase Retry Attempt Counter
			originalRequest.__retry += 1;

			// Handle Unauthorised
			if (error.response.status === 401) {
				// Fetch Refresh Token
				const refreshToken = localStorage.getItem("refreshToken");

				if (refreshToken) {
					return axios
						.get(baseURL + "/auth/refresh", {
							headers: {
								Authorization: "Bearer " + refreshToken,
							},
						})
						.then((response) => {
							// Store New Tokens
							localStorage.setItem(
								"accessToken",
								response.data["access-token"]
							);
							localStorage.setItem(
								"refreshToken",
								response.data["refresh-token"]
							);

							// Modify Original Request
							originalRequest.headers.Authorization =
								"Bearer " + response.data["access-token"];

							return api(originalRequest);
						})
						.catch(() => router.replace({ path: "/login" }));
				} else {
					router.replace({ path: "/login" });
				}
			} else {
				return api(originalRequest);
			}
		}
	}
);

export default api;
