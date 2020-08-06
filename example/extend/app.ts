import axios from '../../src/index'

axios({
	url: '/extend/post',
	method: 'post',
	data: {
		msg: 'hi'
	}
})

axios('post', {
	method: 'post',
	data: {
		name: 'John'
	}
})

axios.request({
	url: '/extend/post',
	method: 'post',
	data: {
		msg: 'hello'
	}
})

axios.get('/extend/get')