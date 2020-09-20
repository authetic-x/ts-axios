import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types';
import {parseHeaders} from './helpers/headers';
import {createError} from './helpers/error';
import { isFormData, isPlainObject } from './helpers/utils';
import { isURLSameOrigin } from './helpers/url';
import cookie from './helpers/cookie';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {url, method='get', data=null, 
      headers, responseType, timeout, 
      cancelToken, withCredentials, 
      csrfCookieName, csrfHeaderName,
      onDownloadProgress, onUploadProgress,
      auth, validateStatus } = config
  
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true);

    configureRequest();

    addEvents();

    processHeaders();

    processCancel();

    request.send(data);

    function configureRequest() {
      if (responseType) {
        request.responseType = responseType;
      }
  
      if (timeout) {
        request.timeout = timeout;
      }
  
      if (withCredentials) {
        request.withCredentials = true;
      }
    }

    function addEvents() {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) return;
        if (request.status === 0) return;
  
        const responseHeaders = parseHeaders(request.getAllResponseHeaders());
        const responseData = responseType !== 'text' ? request.response
          : request.responseText;
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
  
        handleResponse(response);
      }

      // 错误处理
      request.onerror = function handleError() {
        reject(createError(
          'Network Error',
          config,
          null,
          request
        ));
      }
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceed`, config, 'ECONABORTED', request));
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type'];
      }
      
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
      }

      // 将cookie里的token值设置到headers
      if ((withCredentials || isURLSameOrigin(url!)) && csrfCookieName) {
        const csrfValue = cookie.read(csrfCookieName);
        if (csrfValue) {
          headers[csrfHeaderName!] = csrfValue;
        }
      }

      // 设置headers
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name];
        } else if (!isPlainObject(headers[name])) {
          request.setRequestHeader(name, headers[name]);
        }
      });
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          reject(reason);
        });
      }
    }

    // 处理返回值
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${request.status}`, 
          config, 
          null, 
          request, 
          response
        ));
      }
    }
  })
}