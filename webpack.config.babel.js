import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const NODE_ENV = process.env.NODE_ENV || 'development' 
const isdev = NODE_ENV === 'development'

const chunkname = (chunk, type) => 
	isdev && `${chunk}.${type}` || 
	type == 'js' && `[chunkhash].${type}` || 
	type === 'css' && `[hash].${type}`

const config = {
	context: __dirname + '/app',
	entry: {
		index:  "./index",
	},
	
	output: {
		path:     __dirname + '/public/assets/',
		publicPath: '/assets/',
		filename: chunkname('index', 'js'),
		chunkFilename: chunkname('dch[id]', 'js'),
    },
	
	resolve: {
		alias: {
			layout: 	__dirname + '/app/layout',
			lib: 		__dirname + '/app/lib',
			routes: 	__dirname + '/app/routes',
		}
	},

    watch: isdev,

    module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
				}
			},
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}],
    },
	
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin({
			filename: chunkname('style', 'css'),
			allChunks: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "index",
			filename: chunkname('common', 'js'),
			children: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "index",
			async: true,
			children: true,
			minChunks: 2,
		}),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: 'index.html',
		}),
	],

};

if (!isdev) {
    config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false,
		        drop_console: true,
		        unsafe: true
		    }
    	}), 
		// new ManifestPlugin()
	)
}

export default config
