import axios from '../../src/index'

interface ResponseData<T=any> {
	code: number,
	result: T,
	message: string
} 

interface User {
	name: string,
	age: number
}

function getUser<T>() {
	return axios<ResponseData<T>>('/extend/user')
		.then(res => res.data)
		.catch(err => console.error(err))
}

async function test() {
	const user = await getUser<User>()
	if (user) {
		console.log(user.result)
	}
}

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