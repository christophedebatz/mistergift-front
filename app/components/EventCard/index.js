import React from 'react'
import { Link } from 'react-router';

function EventCard(props) {
    let className = props.className ? props.className : '';
    let eventLink = '/events/' + props.event.id;

    const eventCardStyle = {
        backgroundImage: 'url(https://placeholdit.imgix.net/~text?txtsize=35&txt=375%C3%97270&w=375&h=270)',
    }

    return (
        <div className={ className }>
            <Link to={ eventLink } className="event-card__item">
                <span className="event-card__header" style={eventCardStyle}>
                    <time className="event-card__date" dateTime={ props.event.startDate }>{ props.event.startDate }</time>
                </span>

                <span className="event-card__content">
                    <span className="event-card__title">
                        { props.event.name }
                    </span>
                </span>
            </Link>
        </div>
    )
}

export default EventCard
