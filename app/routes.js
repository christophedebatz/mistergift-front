import { UserAuthWrapper } from 'redux-auth-wrapper';

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb, hoc = null) => (componentModule) => {
    if (hoc) cb(null, hoc(componentModule.default));
    else cb(null, componentModule.default);
};

// const Auth = UserAuthWrapper({
//     authSelector: state => state.get('login'),
//     predicate: user => user.loggedIn,
//     redirectAction: routerActions.replace,
//     wrapperDisplayName: 'UserIsAuthenticated',
// });

export default function createRoutes(store) {
    return [
        {
            path: '/',
            name: 'home',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/HomePage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/login',
            name: 'login',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/LoginPage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/register',
            name: 'register',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/RegisterPage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/events',
            name: 'user',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/EventsListPage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/:identifier',
            name: 'user',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/UserViewPage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/NotFoundPage'),
                ]);

                const renderRoute = loadModule(cb, null);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
    ]
}
