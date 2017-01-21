import React from 'react'
import { Link, IndexLink } from 'react-router'
// import { LoginButton, LogoutButton } from '../../components/Header'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const loginButton = this.props.isLoggedIn ? (
            <nav className="role-navigation">
                <ul className="mg-list--horizontal mg-has-block-links--space">
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><IndexLink to="/lists">Listes</IndexLink></li>
                    <li><Link to="/logout">Logout</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        ) : (
            <nav className="role-navigation">
                <ul className="mg-list--horizontal">
                    <li><Link to="/login" className="mg-button mg-button--neutral">Login</Link></li>
                    <li><Link to="/register" className="mg-button mg-button--brand">Register</Link></li>
                </ul>
            </nav>
        );

        return (
            <header className="site-banner" role="banner">
                <div className="mg-grid mg-grid--align-spread mg-container--center mg-container--x-large">
                    <IndexLink to="/"><span className="site-logo">MisterGift</span></IndexLink>

                    {loginButton}
                </div>
            </header>
        )
    }
}

export default Header
