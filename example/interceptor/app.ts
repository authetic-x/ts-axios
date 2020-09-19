import axios from '../../src'

axios.interceptors.request.use(config => {
  console.log('---Interceptor---');
	config.headers.test = 1
	return config
})

/* axios({
	url: '/interceptor/get',
	headers: {
		test: 'haah'
	}
}); */

axios.get('/interceptor/get');