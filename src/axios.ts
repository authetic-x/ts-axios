import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types'
import {buildURL} from './helpers/url'
import {transformRequest, transformResponse} from './helpers/data'
import {processHeaders} from './helpers/headers';
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
	processConfig(config);
	return xhr(config).then(res => {
		return transformResponseData(res);
	});
}

// 处理传入axios的参数
function processConfig(config: AxiosRequestConfig): void {
	config.url = transformURL(config);
	config.headers = transformHeaders(config);
	config.data = transformRequestData(config);
}

// 拼接url查询参数
function transformURL(config: AxiosRequestConfig): string {
	const {url, params} = config;
	return buildURL(url, params);
}

// 处理data类型
function transformRequestData(config: AxiosRequestConfig): any {
	return transformRequest(config.data)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
	const {headers={}, data} = config;
	return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
	res.data = transformResponse(res.data);
	return res;
}

export default axios