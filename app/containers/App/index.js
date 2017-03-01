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

import Metas from 'components/Metas'
import Header from '../../components/Header'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: Auth.loggedIn(),
            isHome: this.props.isHome
        }
    }

    updateAuth = (isLoggedIn) => {
        this.setState({ ...this.state, isLoggedIn: isLoggedIn })
    }

    componentWillReceiveProps = () => {
        this.setState({ ...this.state })
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';
        this.state.isLoggedIn = Auth.loggedIn()
        this.state.isHome = (this.props.location.pathname === '/')

        return (
            <div className={`${className} ${this.state.isLoggedIn ? 'is-logged' : ''}`}>
                <Header isLoggedIn={ this.state.isLoggedIn } isHome={ this.state.isHome } />

                <div className="site-content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    isLoggedIn: React.PropTypes.bool,
    isHome: React.PropTypes.bool,
};

const mapStateToProps = (state, props) => {
    const isLoggedIn = Auth.loggedIn();
    const isHome = (props.location.pathname === '/');

    return {
        isLoggedIn: isLoggedIn,
        isHome: isHome
    }
}

export default connect(mapStateToProps)(App);
