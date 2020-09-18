import axios from '../../src';
import { Canceler } from '../../src/types'

const CancelToken = axios.CancelToken;
const source = axios.CancelToken.source();

axios.get('/cancel/get', {
  cancelToken: source.token,
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('Requested canceled', e.message);
  }
});

setTimeout(() => {
  source.cancel('Operation canceled by user.');

  // 请求不会发出，reason存在请求就会被取消
  axios.post('/cancel/post', { a: 1 }, {
    cancelToken: source.token
  }).catch(e => {
    if (axios.isCancel(e)) {
      console.log(e.message);
    }
  });
}, 100);

let cancel: Canceler;

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c;
  })
});

setTimeout(() => {
  cancel();
}, 200);