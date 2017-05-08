import ManifestPlugin from 'webpack-manifest-plugin'
import webpack from 'webpack'

const NODE_ENV = process.env.NODE_ENV || 'development' 

const config = {
	context: __dirname + '/app',
	entry: {
	  index:  "./index",
	},
	
	output: {
		path:     __dirname + '/public/js',
		publicPath: '/js/',
		filename: "[name].js",
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development'
        ? "cheap-inline-module-source-map"
        : false,

    plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "common"
		}),
	],

    module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
				presets: ['env']
				}
			}
		}]
    }

};

if (NODE_ENV == 'production') {
    config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        // don't show unreachable variables etc
		        warnings: false,
		        drop_console: true,
		        unsafe: true
		    }
    	}), 
		new ManifestPlugin()
	)
}

export default config
