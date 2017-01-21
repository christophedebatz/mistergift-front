import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/landing'
import Home from './containers/home'
import Register from './containers/register'
import Login from './containers/login'
import Logout from './containers/logout'
import Lists from './containers/lists'
import About from './containers/about'
import NotFound from './containers/errors'
import Header from './containers/header'
import { Auth } from './services'

import './assets/scss/index'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoggedIn: false, currentPathname: props.location.pathname }
    }

    updateAuth = (isLoggedIn) => {
        this.setState({ ...this.state, isLoggedIn: isLoggedIn })
    }

    componentWillMount = () => {
        Auth.onChange = this.updateAuth
        if (Auth.hasToken()) Auth.login()
    }

    componentWillReceiveProps = () => {
        this.setState({ ...this.state, currentPathname: this.props.location.pathname })
    }

    render() {
        let className = (this.state.currentPathname === '/home' ? 'site-home' : '')
        let isHeaderVisible = (this.state.currentPathname !== '/')

        return (
            <div className={ className }>
                { isHeaderVisible ? <Header isLoggedIn={ this.state.isLoggedIn } /> : '' }

                { this.props.children }
            </div>
        )
    }
}

// function requireAuth(nextState, replace) {
//     if (!auth.loggedIn()) {
//         replace({
//             pathname: '/login',
//             state: { nextPathname: nextState.location.pathname }
//         })
//     }
// }

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Landing }/>
            <Route path="home" component={ Home }/>
            <Route path="register" component={ Register }/>
            <Route path="login" component={ Login }/>
            <Route path="logout" component={ Logout }/>
            <Route path="lists" component={ Lists }/>
            <Route path="about" component={ About }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    </Router>
), document.getElementById('app'))
