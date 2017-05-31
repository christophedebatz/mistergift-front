import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadEvents } from '../App/actions'
import { selectEvents } from '../App/selectors'

import Loader from 'components/Loader'
import EventCreation from '../EventCreationPage'
import EventCard from 'components/EventCard'
import EventNavigation from 'components/EventNavigation'

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
        const events = this.props.events.get('data') || '';
        const isLoaded = this.props.events.get('isLoaded') || '';
        const errorMessage = this.props.events.get('errorMessage') || '';

        if (!isLoaded) {
            return <Loader />;
        }

        let eventCards = typeof events.invitation !== 'undefined' && events.invitation.length ? events.invitation.map((event) => {
            return (<EventCard className="mg-large-size--1-of-2 mg-col mg-col--padded" event={event} key={event.id} />)
        }) : null

        const content = typeof events.invitation !== 'undefined' && events.invitation.length ? (
            <div className="mg-grid mg-wrap mg-grid--pull-padded">
                ${eventCards}
            </div>
        ) : (
            <div className="mg-text-align--center">
                <button onClick={this.showEventCreationModal.bind(this)} className="mg-button mg-button--brand">Create your Event</button>
            </div>
        );

        return (
            <div>
                <div className="mg-grid mg-wrap mg-grid--pull-padded mg-container--center mg-container--x-large">
                    <div className="mg-p-horizontal--small mg-size--1-of-2 mg-medium-size--5-of-6 mg-large-size--8-of-12">
                        <EventNavigation />

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
        events: selectEvents()(state),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadEvents())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);

