import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


const NODE_ENV = process.env.NODE_ENV || 'development' 

const config = {
	context: __dirname + '/app',
	entry: {
	  index:  "./index",
	},
	
	output: {
		path:     __dirname + '/public/',
		// publicPath: '/js/',
		filename: "js/[name].js",
		chunkFilename: "js/ch[id].js",
    },

    watch: NODE_ENV == 'development',

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
			name: "common"
		}),
		new ExtractTextPlugin({
			filename: 'css/style.css',
			allChunks: true,
		}),
	],

};

if (NODE_ENV == 'production') {
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
