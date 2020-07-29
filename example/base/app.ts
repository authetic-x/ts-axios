import axios from '../../src/index'

axios({
	url: '/base/get',
	params: {
		a: 1,
		b: 2
	}
})

axios({
	url: '/base/get',
	params: {
		foo: ['abc', 'def']
	}
})

const date = new Date()

axios({
	url: '/base/get',
	method: 'get',
	params: {
		date
	}
})

axios({
	url: '/base/get',
	params: {
		foo: '@:$, '
	}
})

axios({
	url: '/base/get',
	params: {
		foo: 'bar',
		baz: 'null'
	}
})

axios({
	url: '/base/post',
	method: 'post',
	data: {
		a: 1,
		b: 2
	}
}).then(res => console.log(res));

axios({
	url: '/base/post',
	method: 'post',
	headers: {
		'content-type': 'application/json',
		'Accept': 'application/json, text/plain, */*'
	},
	responseType: 'json',
	data: {
		a: 1,
		b: 2
	}
}).then(res => {
	console.log(res)
}).catch(err => console.log(err));

const paramString = 'q=util&topic=api';
const searchParams = new URLSearchParams(paramString);

axios({
	url: '/base/post',
	method: 'post',
	data: searchParams
});

const arr = new Int32Array([21, 32]);

axios({
	url: '/base/buffer',
	method: 'post',
	data: arr
})