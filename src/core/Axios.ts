import {
	AxiosPromise, AxiosRequestConfig, AxiosResponse, 
	Method, ResolveFn, RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptor {
	request: InterceptorManager<AxiosRequestConfig>
	response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
	resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
	rejected?: RejectFn
}

export default class Axios {
  interceptors: Interceptor
  defaults: AxiosRequestConfig

	constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
		this.interceptors = {
			request: new InterceptorManager<AxiosRequestConfig>(),
			response: new InterceptorManager<AxiosResponse>()
		}
	}
	// 重载AxiosInstance类型
	request<T=any>(url: any, config?: any): AxiosPromise<T> {
		if (typeof url === 'string') {
			if (!config) {
				config = {}
			}
			config.url = url
		} else {
			config = url
    }
    
    config = mergeConfig(this.defaults, config);

		const chain: PromiseChain<any>[] = [{
			resolved: dispatchRequest,
			rejected: undefined
		}];

		this.interceptors.request.forEach(interceptor => {
			chain.unshift(interceptor)
		})

		this.interceptors.response.forEach(interceptor => {
			chain.push(interceptor)
		})

		let promise = Promise.resolve(config);

		while (chain.length) {
			const { resolved, rejected } = chain.shift()!;
			promise = promise.then(resolved, rejected);
		}

		return promise;
	}

	get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithoutData('get', url, config);
	}

	delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithoutData('delete', url, config);
	}

	head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithoutData('head', url, config);
	}

	options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithoutData('options', url, config);
	}

	post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithData('post', url, data, config);
	}

	put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithData('put', url, data, config);
	}

	patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
		return this._requestWithData('patch', url, data, config);
	}

	_requestWithoutData(method: Method, url: any, config?: AxiosRequestConfig): AxiosPromise {
		return this.request(Object.assign(config || {}, {
			method,
			url
		}));
	}

	_requestWithData(method: Method, url: any, data?: any,
		 config?: AxiosRequestConfig): AxiosPromise {
		return this.request(Object.assign(config || {}, {
			method,
			url,
			data
		}));
	}
}