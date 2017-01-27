/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../robots.txt';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import useScroll from 'react-router-scroll';
import configureStore from './store';

addLocaleData(fr);

// Observe loading of brandon
import styles from 'styles/index.scss';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'containers/AppContainer/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import App from 'containers/AppContainer';
import createRoutes from './routes';
const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

ReactDOM.render(
    <IntlProvider locale="fr">
        <Provider store={store}>
            <Router
                history={history}
                routes={rootRoute}
                render={
                    // Scroll to top when going to a new page, imitating default browser
                    // behaviour
                    applyRouterMiddleware()
                }
            />
        </Provider>
    </IntlProvider>,
    document.getElementById('app')
);

