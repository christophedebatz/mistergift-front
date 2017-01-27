import { Auth } from '../../actions';

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    return [
        {
            path: '/',
            name: 'home',
            getComponent(nextState, cb) {
                System.import('containers/HomePageContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '/login',
            name: 'login',
            getComponent(nextState, cb) {
                System.import('containers/LoginContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '/register',
            name: 'register',
            getComponent(nextState, cb) {
                System.import('containers/RegisterContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '/events',
            name: 'user',
            getComponent(nextState, cb) {
                System.import('containers/EventsListContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '/:identifier',
            name: 'user',
            getComponent(nextState, cb) {
                System.import('containers/UserViewContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                System.import('containers/NotFoundPageContainer')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ]
}
