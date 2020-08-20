import InterceptorManager from '../core/InterceptorManager'

export type Method = 'get' | 'GET'
	| 'post' | 'POST' | 'put' | 'PUT'
	| 'delete' | 'DELETE' | 'options'
	| 'OPTIONS' | 'patch' | 'PATCH'
	| 'head' | 'HEAD'

export interface AxiosRequestConfig {
	url?: string,
	method?: Method,
	data?: any,
	params?: any,
	headers?: any,
	responseType?: XMLHttpRequestResponseType,
	timeout?: number
}

export interface AxiosResponse<T=any> {
	data: T,
	status: number,
	statusText: string,
	headers: any,
	config: AxiosRequestConfig,
	request: any
}

// type AxiosPromise<T=any> = Promise<AxiosResponse<T>>;
export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosError extends Error {
	isAxiosError: Boolean,
	config: AxiosRequestConfig,
	code?: string | null,
	request?: any,
	response?: AxiosResponse
}

export interface Axios {
	interceptors: {
		request: InterceptorManager<AxiosRequestConfig>
		response: InterceptorManager<AxiosResponse>
	}

	request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

	get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

	head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

	options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

	delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

	post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

	put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

	patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
	<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

	<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
	use(resolve: ResolveFn<T>, reject?: RejectFn): number

	eject(id: number): void
}

export interface ResolveFn<T> {
	(val: T): T | Promise<T>
}

export interface RejectFn {
	(error: any): any
}