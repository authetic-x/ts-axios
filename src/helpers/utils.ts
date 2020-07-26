const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
	if (toString.call(val) === '[object Date]') return true
	return false
}

export function isObject(val: any): val is Object {
	return val !== null && typeof val === 'object'
}