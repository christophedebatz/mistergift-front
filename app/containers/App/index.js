/**
*
* App.react.js
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*/

import React from 'react'
import { connect } from 'react-redux'

import { startUserSession } from './actions'
import { selectCurrentUser, selectLoggedInUser, selectLogin } from './selectors'

import Metas from 'components/Metas'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class App extends React.Component {
    componentDidMount() {
        this.props.startUserSession(this.props.login.get('token'))
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';

        const currentUser = this.props.currentUser ? this.props.currentUser.get('data') : {};
        const isLoggedIn = this.props.isLoggedIn;
        const isHome = this.props.isHome;

        return (
            <div className={`${className} ${isLoggedIn ? 'is-logged' : ''}`}>
                <Header currentUser={currentUser} isLoggedIn={isLoggedIn} isHome={isHome} />

                <div className="site-content">
                     { React.cloneElement(this.props.children, {currentUser: currentUser, isLoggedIn: isLoggedIn}) }
                </div>

                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    isLoggedIn: React.PropTypes.bool,
    isHome: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
};

const mapStateToProps = (state, props) => {
    const isHome = (props.location.pathname === '/');

    return {
        isLoggedIn: selectLoggedInUser()(state),
        isHome: isHome,
        currentUser: selectCurrentUser()(state),
        login: selectLogin()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startUserSession: (token) => {
            dispatch(startUserSession(token))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
