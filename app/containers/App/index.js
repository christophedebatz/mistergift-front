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
            currentUser: this.props.currentUser.get('data'),
            isLoggedIn: this.props.isLoggedIn,
            isHome: this.props.isHome
        }
    }

    componentDidMount() {
        this.props.onLoad();
    }

    componentWillReceiveProps() {
        this.setState({ ...this.state })
    }

    render () {
        const className = this.props.isHome ? 'site-home' : '';

        this.state.currentUser = this.props.currentUser.get('data');
        this.state.isLoggedIn = this.props.isLoggedIn;
        this.state.isHome = this.props.isHome;

        console.log(this.state.currentUser);

        return (
            <div className={`${className} ${this.state.isLoggedIn ? 'is-logged' : ''}`}>
                <Header currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} isHome={this.state.isHome} />

                <div className="site-content">
                     { React.cloneElement(this.props.children, {currentUser: this.state.currentUser, isLoggedIn: this.state.isLoggedIn}) }
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
