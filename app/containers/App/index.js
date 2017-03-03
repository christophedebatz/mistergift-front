/**
*
* App.react.js
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*/

import React from 'react'
import { connect } from 'react-redux'
import Auth from '../../auth'

import { loadCurrentUser } from './actions'
import { selectCurrentUser } from './selectors'

import Metas from 'components/Metas'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: Auth.loggedIn(),
            isHome: this.props.isHome
        }
    }

    componentDidMount() {
        this.props.onLoad();
    }

    updateAuth(isLoggedIn) {
        this.setState({ ...this.state, isLoggedIn: isLoggedIn })
    }

    componentWillReceiveProps() {
        this.setState({ ...this.state })
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';
        const currentUser = this.props.currentUser.get('data');

        this.state.isLoggedIn = Auth.loggedIn();
        this.state.isHome = (this.props.location.pathname === '/');

        return (
            <div className={`${className} ${this.state.isLoggedIn ? 'is-logged' : ''}`}>
                <Header currentUser={currentUser} isLoggedIn={this.state.isLoggedIn} isHome={this.state.isHome} />

                <div className="site-content">
                     { React.cloneElement(this.props.children, {isLoggedIn: this.state.isLoggedIn}) }
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
    const isLoggedIn = Auth.loggedIn();
    const isHome = (props.location.pathname === '/');

    return {
        isLoggedIn: isLoggedIn,
        isHome: isHome,
        currentUser: selectCurrentUser()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadCurrentUser())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
