import { browserHistory } from 'react-router'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb, hoc = null) => (componentModule) => {
    if (hoc) cb(null, hoc(componentModule.default));
    else cb(null, componentModule.default);
};

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.get('login'),
    predicate: authData => JSON.parse(localStorage.getItem('session') || {}).token,
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
                browserHistory.push('/events/upcoming')
            }
        }, {
            path: '/events/upcoming',
            name: 'events_upcoming',
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
            path: '/events/invites',
            name: 'events_invites',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/EventsListPage/invites'),
                ]);

                const renderRoute = loadModule(cb, UserIsAuthenticated);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/events/hosting',
            name: 'events_hosting',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/EventsListPage/hosting'),
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
