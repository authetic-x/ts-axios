import axios, {AxiosError} from '../../src/index'

axios({
	url: '/error/get'
}).then(res => {
	console.log(res);
}).catch(e => {
	console.log(e)
})

axios({
	url: '/error/timeout',
	timeout: 1000
}).then(res => {
	console.log(res);
}).catch((e: AxiosError) => {
	console.log(e.message);
	console.log(e.config);
	console.log(e.code);
	console.log(e.request);
})