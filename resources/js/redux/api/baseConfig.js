
import axios from 'axios';

export const baseConfig = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
});

baseConfig.interceptors.request.use(function(config) {
    const token = localStorage.getItem('eventToken');
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});
