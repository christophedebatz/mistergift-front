import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { eventCreation } from '../App/actions'
import { selectEventCreation } from '../App/selectors'

import Modal from 'react-modal'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const m = moment();

class EventsCreationPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            startDate: m,
            endDate: m.add(1, 'd'),
            status: '',
            modalIsOpen: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
    }

    componentWillMount() {
        this.setState({
            modalIsOpen: true
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalIsOpen: true
        });
    }

    handleCloseModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        const request = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate.toISOString(),
            endDate: this.state.endDate.toISOString()
        };

        if (status) request.status = 'PUBLISHED';

        this.props.eventCreation(request)
    }

    render() {
        const modalStyles = {
            content: {
                bottom: 'auto',
                left: '50%',
                marginRight: '-50%',
                right: 'auto',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '25%'
            }
        };

        return (
            <div>
                <Modal
                    contentLabel="Event Creation"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={ this.handleCloseModal }
                    portalClassName="mg-modal"
                    style={modalStyles}>

                    <form className="mg-form--stacked mg-clearfix" onSubmit={ this.handleSubmit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="name">Event Name</label>

                            <div className="mg-form-element__control">
                                <input className="mg-input" id="name" type="text" name="name" value={ this.state.name } placeholder="Name..." onChange={ this.handleInputChange }/>
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="description">Description</label>

                            <div className="mg-form-element__control">
                                <textarea className="mg-textarea" id="description" name="description" value={ this.state.description } placeholder="Description..." onChange={ this.handleInputChange }></textarea>
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="description">Start</label>

                            <div className="mg-form-element__control">
                                <DatePicker
                                    className="mg-input"
                                    selected={ this.state.startDate }
                                    selectsStart
                                    dateFormat="DD/MM/YYYY"
                                    startDate={ this.state.startDate }
                                    endDate={ this.state.endDate }
                                    onChange={ this.handleStartDateChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="description">End</label>

                            <div className="mg-form-element__control">
                                <DatePicker
                                    className="mg-input"
                                    selected={ this.state.endDate }
                                    selectsEnd
                                    dateFormat="DD/MM/YYYY"
                                    startDate={ this.state.startDate }
                                    endDate={ this.state.endDate }
                                    onChange={ this.handleEndDateChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <div className="mg-form-element__control">
                                <span className="mg-checkbox">
                                    <input type="checkbox" name="status" id="status" checked={ this.state.status } onChange={ this.handleInputChange } />

                                    <label className="mg-checkbox__label" htmlFor="status">
                                        <span className="mg-checkbox--faux"></span>
                                        <span className="mg-form-element__label">Publish</span>
                                    </label>
                                </span>
                            </div>
                        </div>

                        <div className="mg-form-element mg-p-top--large mg-float--right">
                            <button onClick={ this.handleCloseModal } className="mg-button" type="button">Close</button>

                            <button className="mg-button mg-button--brand">Create Event</button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

EventsCreationPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        data: selectEventCreation()(state),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        eventCreation: (request) => {
            dispatch(eventCreation(request));
        },

        changeRoute: (url) => dispatch(push(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsCreationPage);
