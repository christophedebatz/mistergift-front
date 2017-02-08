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
        Auth.onChange = this.updateAuth
        if (Auth.hasToken()) Auth.login()
    }

    componentWillReceiveProps = () => {
        this.state.currentPathname = this.props.location.pathname;
        this.setState({ ...this.state })
    }

    componentDidMount() {
        // this.props.onLoad();
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';

        return (
            <div className={ className }>
                <Header isLoggedIn={ this.state.isLoggedIn } currentPathname={ this.state.isHome } />

                { this.props.children }
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
