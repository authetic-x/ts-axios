import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs';
import { stringify } from 'querystring';

axios.defaults.headers.common['test123'] = 123;

axios({
  transformRequest: [
    (function(data: any) {
      return data;
    }),
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1,
  },
  headers: {
    test: 321,
  }
});