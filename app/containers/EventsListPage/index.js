import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadUserEvents } from '../App/actions'
import { selectUserEvents } from '../App/selectors'

import Loader from '../../components/Loader'
import EventCreation from '../EventCreationPage'
import EventCard from '../../components/EventCard'

class EventsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventCreationModalVisible: false
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    showEventCreationModal(e) {
        e.preventDefault();

        this.setState({
            eventCreationModalVisible: true
        });
    }

    render() {
        const events = this.props.events.get('data');
        const isLoaded = this.props.events.get('isLoaded');
        const errorMessage = this.props.events.get('errorMessage');

        if (!isLoaded) {
            return <Loader />;
        }

        const content = events.published.length ? (
            <div className="mg-grid mg-wrap mg-grid--pull-padded">
                events
            </div>
        ) : (
            <div className="mg-text-align--center">
                <button onClick={this.showEventCreationModal.bind(this)} className="mg-button mg-button--brand">Create your Event</button>
            </div>
        );

        return (
            <div className="site-content">
                <div className="mg-grid mg-wrap mg-grid--pull-padded mg-container--center mg-container--x-large">
                    <div className="mg-p-horizontal--small mg-size--1-of-2 mg-medium-size--5-of-6 mg-large-size--8-of-12">
                        <nav className="mg-page-tab mg-clearfix">
                            <ul className="mg-page-tab__list">
                                <li className="mg-page-tab__item">
                                    <Link to={`/events/`} className="mg-page-tab__link">All</Link>
                                </li>

                                <li className="mg-page-tab__item">
                                    <Link to={`/events/`} className="mg-page-tab__link">Invites</Link>
                                </li>

                                <li className="mg-page-tab__item">
                                    <Link to={`/events/`} className="mg-page-tab__link">Hosting</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="events-description mg-p-bottom--large">
                            <h2 className="events-description__title">Events</h2>
                            <h3 className="">Share it by participating to life events</h3>
                        </div>

                        {content}
                    </div>

                    <div className="mg-p-horizontal--small mg-size--1-of-2 mg-medium-size--1-of-6 mg-large-size--4-of-12">
                        <div className="events-create">
                            <button onClick={this.showEventCreationModal.bind(this)} className="mg-button mg-button--brand">Create your Event</button>
                        </div>
                    </div>
                </div>

                {this.state.eventCreationModalVisible && <EventCreation />}
            </div>
        )
    }
}

EventsListPage.propTypes = {
};

const mapStateToProps = (state, props) => {
    return {
        events: selectUserEvents()(state),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadUserEvents())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);

