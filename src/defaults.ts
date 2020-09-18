import { AxiosRequestConfig } from "./types";
import { processHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    }
  },
  transformRequest: [
    function(data: any, headers: any) {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponse(data);
    }
  ]
}

const methodsWithNoData = ['get', 'delete', 'head', 'options'];

methodsWithNoData.forEach(method => {
  defaults.headers[method] = {};
})

const methodsWithData = ['post', 'patch', 'put'];

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default defaults;