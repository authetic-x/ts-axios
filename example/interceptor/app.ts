import axios from '../../src'

axios.interceptors.request.use(config => {
	config.headers.test = 1
	return config
})

axios({
	url: '/interceptor/get',
	headers: {
		test: 'haah'
	}
});