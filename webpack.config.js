var path              = require('path');
var webpack           = require('webpack');

module.exports = {

	entry: [
      	'webpack-dev-server/client?http://localhost:8080',
      	path.resolve('./src/main.js')
	],

	output: {
		filename: "bundle.js",
		path: __dirname
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

};
