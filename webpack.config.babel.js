import path from 'path';
import webpack from 'webpack';

const isDebug = process.env.NODE_ENV !== 'production';

const webpackConfig = {
	context: __dirname,
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'public/'),
		filename: 'index.min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }],
							'stage-0',
						],
					},
				}],
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader',
					options: {
						configFile: '.eslintrc',
						failOnWarning: false,
						failOnError: false,
						fix: true,
					},
				},
			}
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [],
	watch: isDebug,
	devtool: isDebug ? 'eval' : false,
};

if (!isDebug) {
	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: isDebug,
		}),
	);
	webpackConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	);
}

module.exports = webpackConfig;
