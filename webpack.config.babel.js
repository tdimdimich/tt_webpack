import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


const NODE_ENV = process.env.NODE_ENV || 'development' 
const isdev = NODE_ENV === 'development'

const chunkname = (chunk, type) => isdev && `${chunk}.${type}` || `${chunk}_[chunkhash].${type}`

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

    watch: isdev,

    module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
				presets: ['env']
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
		new webpack.optimize.CommonsChunkPlugin({
			name: "common", filename: chunkname('common', 'js')
		}),
		new ExtractTextPlugin({
			filename: chunkname('style', 'css'),
			allChunks: true,
		}),
		
	],

};

if (isdev) {
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
