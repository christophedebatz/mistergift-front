import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb, hoc = null) => (componentModule) => {
    if (hoc) cb(null, hoc(componentModule.default));
    else cb(null, componentModule.default);
};

const localStorageToken = localStorage.getItem('token');

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.get('login'),
    predicate: authData => localStorageToken !== null,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
});

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
            path: '/settings',
            name: 'settings',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/UserSettingsPage'),
                ]);

                const renderRoute = loadModule(cb, UserIsAuthenticated);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/events',
            name: 'events',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/EventsListPage'),
                ]);

                const renderRoute = loadModule(cb, UserIsAuthenticated);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/:userId',
            name: 'user',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/UserViewPage'),
                ]);

                const renderRoute = loadModule(cb, UserIsAuthenticated);

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
