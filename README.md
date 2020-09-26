# ts-axios


A pratical project that refactors the axios library with Typescript.

### Usage

```bash
git clone https://github.com/authetic-x/ts-axios.git
cd ts-axios

npm install

# test server will run on localhost:8080
npm run dev
```

### TODO

- [X] 在浏览器端使用 XMLHttpRequest 对象通讯
- [X] 支持 Promise API
- [X] 支持请求和响应的拦截器
- [X] 支持请求的取消
- [X] JSON 数据的自动转换
- [X] 客户端防止 XSRF
- [X] 支持单元测试

### Project structure

#### 核心函数

```js
request(axios)
---
重载(request函数可以接受method)
---
合并config(mergeConfig(defaults, config))
---
添加Interceptor
---
promiseChain链式执行
---
Request Interceptor
---
dispatchRequest()
===
processConfig(transformURL, transformData, flattenHeaders)
===
xhr(发出请求，添加错误处理，处理Response)
---
Response Interceptor
```