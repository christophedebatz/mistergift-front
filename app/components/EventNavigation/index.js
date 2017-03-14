import React from 'react'
import { Link } from 'react-router'

class EventNavigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let classes = this.props.classes ? this.props.classes : '';

        return (
			<nav className={`mg-page-tab mg-clearfix ${classes}`}>
                <ul className="mg-page-tab__list">
                    <li className="mg-page-tab__item">
                        <Link to={`/events/upcoming`} className="mg-page-tab__link" activeClassName="is-active">All</Link>
                    </li>

                    <li className="mg-page-tab__item">
                        <Link to={`/events/invites`} className="mg-page-tab__link" activeClassName="is-active">Invites</Link>
                    </li>

                    <li className="mg-page-tab__item">
                        <Link to={`/events/hosting`} className="mg-page-tab__link" activeClassName="is-active">Hosting</Link>
                    </li>
                </ul>
            </nav>
		)
    }
}

export default EventNavigation
