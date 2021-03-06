import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types'
import {buildURL, combineURL, isAbsoluteURL} from '../helpers/url'
import {transformRequest, transformResponse} from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers';
import xhr from '../xhr'
import transform from './transform';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationrequested(config);
	processConfig(config);
	return xhr(config).then(res => {
		return transformResponseData(res);
	});
}

// 处理传入axios的参数
function processConfig(config: AxiosRequestConfig): void {
	config.url = transformURL(config);
	config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

// 拼接url查询参数
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config;
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url);
  }
	// 断言url不为undefined
	return buildURL(url!, params, paramsSerializer);
}

// 处理data类型
function transformRequestData(config: AxiosRequestConfig): any {
	return transformRequest(config.data)
}
/* 
// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
	const {headers={}, data} = config;
	return processHeaders(headers, data);
} */

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
	return res;
}

function throwIfCancellationrequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}