const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

require('./server2');

const app = new express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
	publicPath: '/__build__/',
	stats: {
		colors: true,
		chunks: false
	}
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('CSRF-TOKEN-D', 'test-cookie');
  }
}))

app.use(bodyParser.json())

// 不知道干啥的
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser());

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter();
registerCancelRouter();
registerMoreRouter();

app.use(router)

const port = process.env.PORT || 8000
module.exports = app.listen(port, () => console.log('Server listening on localhost:8080'))

function registerSimpleRouter() {
	router.get('/simple/get', (req, res) => {
		res.json({
			msg: `hello world`
		})
	})
}

function registerBaseRouter() {
	router.get('/base/get', (req, res) => {
		res.json(req.query)
	})

	router.post('/base/post', (req, res) => {
		res.json(req.body);
	})

	router.post('/base/buffer', (req, res) => {
		let data = [];
		req.on('data', chunk => {
			if (chunk) {
				data.push(chunk)
			}
		})

		req.on('end', () => {
			let buf = Buffer.concat(data)
			res.json(buf.toJSON());
		})
	})
}

function registerErrorRouter() {
	router.get('/error/get', (req, res) => {
		if (Math.random() > 0.5) {
			res.json({
				msg: 'hello, world'
			});
		} else {
			res.status(500);
			res.end();
		}
	})
	
	router.get('/error/timeout', (req, res) => {
		setTimeout(() => {
			res.json({
				msg: 'Hello'
			})
		}, 3000);
	})
}

function registerExtendRouter() {
	router.get('/extend/get', (req, res) => {
		res.end('you got me!')
	})

	router.post('/extend/post', (req, res) => {
		res.json(req.body)
	})
}

function registerInterceptorRouter() {
	router.get('/interceptor/get', (req, res) => {
		res.end('Interceptor works fine!');
	})
}

function registerConfigRouter() {
  router.post('/config/post', (req, res) => {
    res.end('Config post!');
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', (req, res) => {
    setTimeout(() => {
      res.end('Get me!');
    }, 1000);
  })

  router.post('/cancel/post', (req, res) => {
    setTimeout(() => {
      res.end('Post!');
    }, 1000);
  });
}

function registerMoreRouter() {
  router.get('/more/get', (req, res) => {
    res.json(req.cookies);
    res.end();
  })

  router.post('/more/upload', (req, res) => {
    console.log(req.body, req.files);
    res.end('Upload success');
  });
}