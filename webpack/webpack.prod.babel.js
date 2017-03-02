// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ChunksPlugin = require('./plugins/ChunksPlugin');

// PostCSS plugins
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');

module.exports = require('./webpack.base.babel')({
    // In production, we skip all hot-reloading stuff
    entry: [
        path.join(process.cwd(), 'app/app.js'),
    ],

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    babelQuery: {
        // require.resolve solves the issue of relative presets when dealing with
        // locally linked packages. This is an issue with babel and webpack.
        // See https://github.com/babel/babel-loader/issues/149 and
        // https://github.com/webpack/webpack/issues/1866
        presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'].map(require.resolve),
    },

    // We use ExtractTextPlugin so we get a seperate CSS file instead
    // of the CSS being in the JS and injected as a style tag
    cssLoaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?importLoaders=1!postcss-loader!sass-loader'
    }),

    // In production, we minify our CSS with cssnano
    postcssPlugins: [
        autoprefixer({browsers: ['last 2 versions', 'ie >= 10', 'Edge 13', 'Safari 7']}),
        postcssReporter({
            clearMessages: true,
        })
    ],

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),

        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),

        // // Minify and optimize the JavaScript
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        // }),

        // Extract the CSS into a seperate file
        new ExtractTextPlugin('[name].[contenthash].css'),

        new ChunksPlugin(),
    ],
});
