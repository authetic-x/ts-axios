const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: 'development',

	// 构建多个目录的入口文件
	entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
		const fullDir = path.join(__dirname, dir)
		const entry = path.join(fullDir, 'app.ts')
		if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
			entries[dir] = ['webpack-hot-middleware/client', entry]
		}
		return entries
	}, {}),
	
	output: {
		path: path.join(__dirname, '__build__'),
		filename: '[name].js',
		publicPath: '/__build__/'
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'tslint-loader'
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
		]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}