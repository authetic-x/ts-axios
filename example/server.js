const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

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

app.use(express.static(__dirname))

app.use(bodyParser.json())

// 不知道干啥的
app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()

app.use(router)

const port = process.env.PORT || 8080
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
}