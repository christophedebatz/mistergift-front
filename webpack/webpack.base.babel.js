/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
    entry: options.entry,

    output: Object.assign({ // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
    }, options.output), // Merge with env dependent settings

    module: {
        loaders: [{
            test: /\.js$/, // Transform all .js files required somewhere with Babel
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: options.babelQuery,
        }, {
            // Transform our own .css files with PostCSS and CSS-modules
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: options.cssLoaders,
        }, {
            // Do not transform vendor's CSS with CSS-modules
            // The point is that they remain in global scope.
            // Since we require these CSS files in our JS or CSS files,
            // they will be a part of our compilation either way.
            // So, no need for ExtractTextPlugin here.
            test: /\.s?css$/,
            include: /node_modules/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.jpe?g$|\.gif$|\.png$/i,
            exclude: /icons/,
            loader: 'file-loader?name=img/[name].[ext]',
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash].[ext]',
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            options: {
                name: '[name]_[hash]',
                prefixize: true,
                spriteModule: 'components/ClientSprite'
            }
        }],
    },

    plugins: options.plugins.concat([
        new webpack.ProvidePlugin({
            // make fetch available
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),

        new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
            if (!/\/moment\//.test(context.context)) { return }

            Object.assign(context, {
                regExp: /^\.\/(en-gb|fr)/,
                request: '../../locale'
            })
        }),
    ]),

    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
          '.js',
          '.jsx',
          '.react.js',
        ],

        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },

    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
});
