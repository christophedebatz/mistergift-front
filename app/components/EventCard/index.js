import React from 'react'
import { Link } from 'react-router'

class EventCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let className = props.className ? props.className : null;
        let event = this.props.event;

        const eventCardStyle = {
            backgroundImage: 'url(https://placeholdit.imgix.net/~text?txtsize=35&txt=375%C3%97270&w=375&h=270)',
        }

        return (
            <div className={ className }>
                <Link to={`/events/${event.id}`} className="event-card__item">
                    <span className="event-card__header" style={ eventCardStyle }>
                        <time className="event-card__date" dateTime={ event.startDate }>{ event.startDate }</time>
                    </span>

                    <span className="event-card__content">
                        <span className="event-card__title">
                            { event.name }
                        </span>
                    </span>
                </Link>
            </div>
        )
    }
}

export default EventCard
