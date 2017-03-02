/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const postcssReporter = require('postcss-reporter');
const postcssAutoprefixer = require('autoprefixer');

module.exports = require('./webpack.base.babel')({
    // Add hot reloading in development
    entry: [
        'eventsource-polyfill', // Necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
    ],

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    // Tell babel that we want to hot-reload
    babelQuery: {
        // require.resolve solves the issue of relative presets when dealing with
        // locally linked packages. This is an issue with babel and webpack.
        // See https://github.com/babel/babel-loader/issues/149 and
        // https://github.com/webpack/webpack/issues/1866
        presets: ['babel-preset-react-hmre'].map(require.resolve),
    },

    // Load the CSS in a style tag in development
    cssLoaders: 'style-loader!css-loader!postcss-loader?syntax=postcss-scss!sass-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap',

    // Process the CSS with PostCSS
    postcssPlugins: [
        postcssAutoprefixer({browsers: ['last 2 versions', 'ie >= 10', 'Edge 13', 'Safari 7']}),
        postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true,
        })
    ],

    // Add hot reloading
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        new webpack.NoEmitOnErrorsPlugin()
    ],

    // Tell babel that we want to hot-reload
    babelQuery: {
        presets: ['react-hmre'],
    },

    // Emit a source map for easier debugging
    devtool: 'inline-source-map',
});
