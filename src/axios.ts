import {AxiosInstance, AxiosRequestConfig, AxiosStatic} from './types'
import Axios from './core/Axios'
import {extend} from './helpers/utils'
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';

/**
 * @return: request方法，混入了get, post这些方法
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
	const context = new Axios(config)
	// request内部并没有用this，不知道这一行有什么用
	const instance = Axios.prototype.request.bind(context)

	extend(instance, context)
	return instance as AxiosStatic
}

const axios = createInstance(defaults);

axios.create = function create(config){
  return createInstance(mergeConfig(defaults, config));
}

export default axios