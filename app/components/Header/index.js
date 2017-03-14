import React from 'react'
import { Link, IndexLink } from 'react-router'

import Icon, { GLYPHS } from '../Icon'
import Logo from 'styles/images/logo.png'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dropdownIsActive: false,
            dropdownIsVisible: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.hideDropdown, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideDropdown, false);
    }

    toggleDropdown() {
        const { dropdownIsVisible } = this.state;

        this.setState({ dropdownIsVisible: !dropdownIsVisible });
    }

    hideDropdown() {
        const { dropdownIsActive } = this.state;

        if (!dropdownIsActive) {
            this.setState({dropdownIsVisible: false});
        }
    }

    handleFocus() {
        this.setState({ dropdownIsActive: true });
    }

    handleBlur() {
        this.setState({
            dropdownIsVisible: false,
            dropdownIsActive: false,
        });
    }

    render() {
        let isHome = this.props.isHome;
        let isLoggedIn = this.props.isLoggedIn;
        let currentUser = this.props.currentUser;
        const { dropdownIsVisible } = this.state;

        let loginButton = isHome ? (
            <li><Link to="/login" className="mg-button mg-button--neutral">Login</Link></li>
        ) : (
            <li><Link to="/login" className="mg-button">Login</Link></li>
        );

        let headerNavigation = isLoggedIn && currentUser ? (
            <nav role="navigation">
                <ul className="mg-list--horizontal mg-has-block-links--space">
                    <li><Link to="/events" activeClassName="is-active">Events</Link></li>
                    <li>
                        <div className={`mg-dropdown-trigger mg-dropdown-trigger--click ${dropdownIsVisible ? 'mg-is-open' : ''}`}>
                            <a aria-haspopup="true" title="Show More"
                                tabIndex="-1"
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                onClick={this.toggleDropdown}>
                                {currentUser.firstName}
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
            <header className="site-banner" role="banner" onClick={this.handleBodyClick}>
                <div className="mg-grid mg-grid--align-spread mg-container--center mg-container--x-large mg-p-horizontal--small">
                    <IndexLink to="/">
                        <img className="site-logo__image" src={Logo} alt="MisterGift" />
                        <span className="site-logo">MisterGift</span>
                    </IndexLink>

                    {headerNavigation}
                </div>
            </header>
        )
    }
}

Header.propTypes = {
}

export default Header
