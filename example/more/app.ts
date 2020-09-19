import axios from '../../src';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

const instance = axios.create();

function calculateProgress(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total;
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      console.log('---start---');
      NProgress.start();
      return config;
    });
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e);
      const progress = calculateProgress(e.loaded, e.total);
      console.log(progress);
      NProgress.set(progress);
    }
    instance.defaults.onDownloadProgress = update;
    instance.defaults.onUploadProgress = update;
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      console.log('---done---')
      NProgress.done();
      return response;
    }, err => {
      NProgress.done();
      return Promise.reject(err);
    });
  }

  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}

loadProgressBar();

const downloadEl = document.getElementById('download-btn');
downloadEl.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg');
});

const uploadEl = document.getElementById('upload-form');
uploadEl.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData();
  const fileEl = document.getElementById('upload-input') as HTMLInputElement;
  if (fileEl.files) {
    data.append('file', fileEl.files[0]);
    instance.post('/more/upload', data);
  }
});