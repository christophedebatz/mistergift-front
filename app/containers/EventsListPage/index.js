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
        console.log(this.props.events.toJS())
        const events = this.props.events.get('data');
        const isLoaded = this.props.events.get('isLoaded');
        const errorMessage = this.props.events.get('errorMessage');

        console.log(this.props.events);

        // let events = [
        //     {
        //         id: 1,
        //         name: 'Anniversaire Joulse',
        //         startDate: day + month
        //     },
        //     {
        //         id: 2,
        //         name: 'Anniversaire Christophe',
        //         startDate: day + month
        //     },
        //     {
        //         id: 3,
        //         name: 'Noël',
        //         startDate: day + month
        //     },
        //     {
        //         id: 4,
        //         name: 'Pâques',
        //         startDate: day + month
        //     }
        // ]

        // let eventCards = events.map((event) => {
        //     return (<EventCard className="mg-p-horizontal--small mg-size--1-of-2 mg-p-bottom--large" event={ event } key={ event.id } />)
        // })

        if (!isLoaded) {
            return <Loader />;
        }

        console.log(events)

        return (
            <div className="site-content">
                <div className="mg-grid mg-wrap mg-grid--pull-padded mg-container--center mg-container--x-large">
                    <div className="mg-p-horizontal--small mg-size--1-of-2 mg-medium-size--5-of-6 mg-large-size--8-of-12">
                        <div className="events-description mg-p-bottom--large">
                            <h2 className="events-description__title">Events</h2>
                            <h3 className="">Share it by participating to life events</h3>
                        </div>

                        <div className="mg-grid mg-wrap mg-grid--pull-padded">
                            { events && <EventCreation />}
                        </div>
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

