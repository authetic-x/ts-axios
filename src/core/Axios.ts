import {AxiosPromise, AxiosRequestConfig, Method} from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
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
		return dispatchRequest(config);
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