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
  transformRequest?: AxiosTransformer | AxiosTransformer[],
  transformResponse?: AxiosTransformer | AxiosTransformer[],
  cancelToken?: CancelToken
  withCredentials?: boolean
  csrfCookieName?: string
  csrfHeaderName?: string
  auth?: AxiosBasicCredentials
  baseURL?: string

  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  
  [propName: string]: any
}

export interface AxiosBasicCredentials {
  username: string
  password: string
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
  defaults: AxiosRequestConfig

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
  
  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
	<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

	<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: string) => boolean

  all<T>(promise: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
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

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// CancelToken的实例类型
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// CancelToken的类类型
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}