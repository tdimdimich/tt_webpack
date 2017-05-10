import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const NODE_ENV = process.env.NODE_ENV || 'development'
const isdev = NODE_ENV === 'development'

const chunkname = (chunk, type) => 
	isdev && `${chunk}.${type}` || 
	type == 'js' && `[name]_[chunkhash].${type}` || 
	type === 'css' && `[hash].${type}`

const config = {
	context: __dirname + '/app',
	entry: {
		index:  "./index",
	},
	
	output: {
		path:     __dirname + '/public/assets/',
		publicPath: '/assets/',
		filename: chunkname('[name]', 'js'),
		chunkFilename: chunkname('dch[id]', 'js'),
    },
	
	resolve: {
		extensions: [".js", ".jsx", ".json"],
		alias: {
			actions: 		__dirname + '/app/actions',
			components: 	__dirname + '/app/components',
			containers: 	__dirname + '/app/containers',
		}
	},

    watch: isdev,

    module: {
		rules: [{
			test: /\.(js|jsx)$/,
			include: /app/,
			use: {
				loader: 'babel-loader',
				options: {
					plugins: ['transform-react-jsx'],
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
			// 'process.env': {
		    // 	NODE_ENV: JSON.stringify('production'),
		    // },
			// NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /\!/),
		new ExtractTextPlugin({
			filename: chunkname('style', 'css'),
			allChunks: true,
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "index",
		// 	filename: chunkname('common', 'js'),
		// 	children: true,
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "index",
		// 	async: true,
		// 	children: true,
		// 	minChunks: 2,
		// }),
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
