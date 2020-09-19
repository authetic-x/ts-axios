import axios from '../../src';

axios.get('/more/server2');

axios.post('http://localhost:8088/more/server2', {}, {
  withCredentials: true,
}).then(res => {
  console.log(res);
});

const instance = axios.create({
  csrfCookieName: 'CSRF-TOKEN-D',
  csrfHeaderName: 'x-CSRF-TOKEN-D',
});

instance.get('/more/get').then(res => {
  console.log(res);
})