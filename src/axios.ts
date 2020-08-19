import {AxiosInstance} from './types'
import Axios from './core/Axios'
import {extend} from './helpers/utils'
/**
 * @return: request方法，混入了get, post这些方法
 */
function createInstance(): AxiosInstance {
	const context = new Axios()
	// request内部并没有用this，不知道这一行有什么用
	const instance = Axios.prototype.request.bind(context)

	extend(instance, context)
	return instance as AxiosInstance
}

const axios = createInstance()

export default axios