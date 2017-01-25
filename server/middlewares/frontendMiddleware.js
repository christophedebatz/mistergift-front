const express = require('express');
const path = require('path');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

const getAssets = (jsonDirPath, fs) => {
    const isProd = process.env.NODE_ENV === 'production';

    if (!isProd) {
        return {
            "styles": [],
            "javascripts": ["/main.js"]
        };
    }

    if (!fs) {
        fs = require('fs')
    }

    const jsonPath = path.resolve(jsonDirPath, 'webpack-chunks.json');
    return JSON.parse(require('fs').readFileSync(jsonPath, 'utf8'))
}

// Dev middleware
const addDevMiddlewares = (app, options) => {
    const compiler = webpack(options);
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: options.output.publicPath,
        silent: true,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    addDefaultRoute(app, compiler.outputPath)
};

const addDefaultRoute = (app, outputPath) => {
    const assets = getAssets(outputPath);
    const config = JSON.stringify(require('../../app/config/config.json'));

    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '../../app/views'));

    app.get('*', (req, res) => {
        res.render('index', {
            assets: assets,
            config: config,
        });
    });
}

// Production middlewares
const addProdMiddlewares = (app, options) => {
    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy
    app.use(compression());

    app.use(options.output.publicPath, express.static(options.output.path));

    addDefaultRoute(app, options.output.path)
};

/**
 * Front-end middleware
 */

module.exports = (options) => {
    const isProd = process.env.NODE_ENV === 'production';
    const app = express();

    if (isProd) {
        addProdMiddlewares(app, options);
    } else {
        addDevMiddlewares(app, options);
    }

    return app;
};
