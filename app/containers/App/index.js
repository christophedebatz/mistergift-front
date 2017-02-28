/**
*
* App.react.js
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*/

import React from 'react';
import { connect } from 'react-redux'
import Metas from 'components/Metas';
import Auth from '../../auth';

import Header from '../../components/Header';

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

    componentWillMount = () => {
        if (Auth.hasToken()) Auth.login()
    }

    componentWillReceiveProps = () => {
        this.setState({ ...this.state })
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';
        this.state.isHome = (this.props.location.pathname === '/')

        return (
            <div className={ className }>
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
    isHome: React.PropTypes.bool,
};

const mapStateToProps = (state, props) => {
    const isHome = (props.location.pathname === '/');

    return {
        isHome: isHome
    }
}

export default connect(mapStateToProps)(App);
