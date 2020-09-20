import {
	isDate,
	isPlainObject,
  isURLSearchParams
} from './utils'

export function encode(val: string): string {
	return encodeURIComponent(val)
		.replace(/%40/g, '@')
		.replace(/%3A/ig, ':')
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
export function buildURL(url: string, params?: any, 
  paramsSerializer?: (params: any) => string): string {
	if (!params) return url

  const parts: string[] = [];
  let serializedParams;
  
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
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
        } else if (isPlainObject(v)) {
          v = JSON.stringify(v);
        }
        // 对部分字符编码
        parts.push(`${encode(key)}=${encode(v)}`);
      })
    });
    serializedParams = parts.join('&');
  }

	if(serializedParams) {
		const markIndex = url.indexOf('#')
		if (markIndex !== -1) {
			url = url.slice(0, markIndex);
		}

		url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
	}

	return url
}

interface URLOrigin {
  protocol: string
  host: string
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;

  return {
    protocol,
    host,
  }
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL);
  return parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host;
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-\.]*:)?\/\//i.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + 
    relativeURL.replace(/^\/+/, '') : baseURL;
}