import {
	isDate,
	isObject
} from './utils'

function encode(val: string): string {
	return encodeURIComponent(val)
		.replace(/%40/g, '@')
		.replace(/%3!A/ig, ':')
		.replace(/%24/g, '$')
		.replace(/%2C/ig, ',')
		.replace(/%20/g, '+')
		.replace(/%5B/ig, '[')
		.replace(/%5D/ig, ']')
}

/**
 * 将query参数拼接到url
 * @param url 
 * @param params
 */
export function buildURL(url: string, params?: any): string {
	if (!params) return url

	const parts: string[] = []

	Object.keys(params).forEach(key => {
		const val = params[key]
		if (val === null || val === undefined) return

		let values = []

		// 对数组做特殊处理
		if (Array.isArray(val)) {
			values = val
			key += '[]'
		} else {
			values = [val]
		}

		values.forEach(v => {
			if (isDate(v)) {
				v = v.toISOString();
			} else if (isObject(v)) {
				v = JSON.stringify(v);
			}
			// 对部分字符编码
			parts.push(`${encode(key)}=${encode(v)}`);
		})
	})

	let serializedParams = parts.join('&')
	if(serializedParams) {
		const markIndex = url.indexOf('#')
		if (markIndex !== -1) {
			url = url.slice(0, markIndex);
		}

		url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
	}

	return url
}