import React from 'react'
import { Link, IndexLink } from 'react-router'

import Icon, { GLYPHS } from '../Icon'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dropdownIsVisible: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this)
    }

    toggleDropdown(e) {
        e.preventDefault();

        this.setState(prevState => ({
            dropdownIsVisible: !prevState.dropdownIsVisible
        }));
    }

    render() {
        let isHome = this.props.isHome;
        let isLoggedIn = this.props.isLoggedIn;
        let currentUser = this.props.currentUser;

        let loginButton = isHome ? (
            <li><Link to="/login" className="mg-button mg-button--neutral">Login</Link></li>
        ) : (
            <li><Link to="/login" className="mg-button">Login</Link></li>
        );

        let headerNavigation = isLoggedIn && currentUser ? (
            <nav role="navigation">
                <ul className="mg-list--horizontal mg-has-block-links--space">
                    <li><Link to="/events" activeClassName="is-active">Events</Link></li>
                    <li><Link to="/wishlist" activeClassName="is-active">Wishlist</Link></li>
                    <li>
                        <div className={`mg-dropdown-trigger mg-dropdown-trigger--click ${this.state.dropdownIsVisible ? 'mg-is-open' : ''}`}>
                            <a aria-haspopup="true" title="Show More" onClick={this.toggleDropdown}>
                                {currentUser.name}
                                <Icon glyph={GLYPHS.CARET_DOWN} />
                                <span className="mg-assistive-text">Show More</span>
                            </a>

                            <div className="mg-dropdown mg-dropdown--left">
                                <ul className="mg-dropdown__list" role="menu">
                                    <li className="mg-dropdown__item" role="presentation">
                                        <Link to={`/${currentUser.id}`}>My Profile</Link>
                                    </li>

                                    <li className="mg-has-divider--top-space" role="separator"></li>

                                    <li className="mg-dropdown__item" role="presentation">
                                        <Link to="/settings">Settings</Link>
                                    </li>

                                    <li className="mg-has-divider--top-space" role="separator"></li>

                                    <li className="mg-dropdown__item" role="presentation">
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </li>
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
