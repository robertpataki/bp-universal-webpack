// This is the base Webpack configuration file

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// project folder
var root_folder = path.resolve(__dirname, '..')

// where all the (source) assets reside
var assets_source_folder = path.resolve(root_folder, 'assets')

// regular expressions for module.loaders
var regular_expressions =
{
	javascript : /\.js$/,
	styles     : /\.scss$/
}

var configuration =
{
	// resolve all relative paths from the project root folder
	context: root_folder,

	// https://webpack.github.io/docs/multiple-entry-points.html
	entry:
	{
		main: './code/client/application.entry.js'
	},

	output:
	{
		// filesystem path for static files
		path: path.resolve(root_folder, 'build/assets'),

		// network path for static files
		publicPath: '/assets/',

		// file name pattern for entry scripts
		filename: '[name].[hash].js',

		// file name pattern for chunk scripts
		chunkFilename: '[name].[hash].js'
	},

	module:
	{
		loaders:
		[
			{
				test   : /\.json$/,
				loader : 'json-loader'
			},
			{
				test    : regular_expressions.javascript,
				// include: [path.resolve(root_folder, 'code')],
				// exclude: path.resolve(root_folder, 'node_modules'),
				exclude: [/node_modules/],
				loader: 'babel-loader'
			},
			{
        // for some modules like foundation
        test: /\.scss$/,
        exclude: [/node_modules/], // sassLoader will include node_modules explicitly
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
			{
				test    : /\.(jpg|png)$/,
				loaders :
				[
					'url-loader?limit=10000' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
				]
			}
		]
	},

	postcss: () => [autoprefixer({ browsers: 'last 2 version' })],

	sassLoader: {
		sourceMap: true,
		outputStyle: 'expanded',
    includePaths: [path.resolve(__dirname, 'node_modules')]
  },

	// maybe some kind of a progress bar during compilation
	progress: true,

	// resolve:
	// {
	// 	// you can now require('file') instead of require('file.[extension]')
	// 	extensions: ['', '.json', '.js']
	// },

	plugins: [
		new ExtractTextPlugin('style.css')
	]
}

module.exports = configuration

// will be used in development and production configurations
configuration.regular_expressions = regular_expressions
