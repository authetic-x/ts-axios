import {deepMerge, isPlainObject} from './utils'
import { head } from 'shelljs';
import { Method } from '../types';

function normalizeHeaderName(headers: any, normalizedName: string): void {
	if (!headers) return;

	Object.keys(headers).forEach(name => {
		if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
			headers[normalizedName] = headers[name];
			delete headers[name];
		}
	})
}

export function processHeaders(headers: any, data: any): any {
	normalizeHeaderName(headers, 'Content-Type');

	if (isPlainObject(data)) {
		if (headers && !headers['Content-Type']) {
			headers['Content-Type'] = 'application/json;charset=utf-8';
		}
	}

	return headers;
}

export function parseHeaders(headers: string): any {
	const parsed = Object.create(null);
	if (!headers) return parsed;

	headers.split('\r\n').forEach(line => {
		let [key, val] = line.split(':');
		key = key.trim().toLowerCase();
		if (!key) {
			return;
		}
		if (val) {
			val = val.trim();
		}
		parsed[key] = val;
	})

	return parsed;
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common, headers[method], headers);
  const headersToDelete = ['common', 'get', 'post', 'put', 'delete', 
  'patch', 'options'];

  headersToDelete.forEach(method => {
    delete headers[method];
  })

  return headers;
}