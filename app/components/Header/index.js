import React from 'react'
import { Link, IndexLink } from 'react-router'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const loginButton = this.props.isHome ? (
            <li><Link to="/login" className="mg-button mg-button--neutral">Login</Link></li>
        ) : (
            <li><Link to="/login" className="mg-button">Login</Link></li>
        );

        const headerNavigation = this.props.isLoggedIn ? (
            <nav role="navigation">
                <ul className="mg-list--horizontal mg-has-block-links--space">
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><IndexLink to="/events">Events</IndexLink></li>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        ) : (
            <nav role="navigation">
                <ul className="mg-list--horizontal">
                    {loginButton}
                    <li><Link to="/register" className="mg-button mg-button--brand">Register</Link></li>
                </ul>
            </nav>
        );

        return (
            <header className="site-banner" role="banner">
                <div className="mg-grid mg-grid--align-spread mg-container--center mg-container--x-large mg-p-horizontal--small">
                    <IndexLink to="/"><span className="site-logo">MisterGift</span></IndexLink>

                    {headerNavigation}
                </div>
            </header>
        )
    }
}

Header.propTypes = {
}

export default Header
