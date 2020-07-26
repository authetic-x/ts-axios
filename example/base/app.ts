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