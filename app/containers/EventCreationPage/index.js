import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { eventCreation } from '../App/actions'
import { selectEventCreation } from '../App/selectors'

import Modal from 'react-modal'

class EventsCreationPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            modalIsOpen: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    onRequestClose={this.handleCloseModal.bind(this)}
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
                            <label className="mg-form-element__label" htmlFor="description">Date</label>

                            <div className="mg-form-element__control">
                                <input className="mg-input" id="name" type="date" name="date" value={ this.state.date } placeholder="08/02/2017" onChange={ this.handleInputChange }/>
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <div className="mg-form-element__control">
                                <span className="mg-checkbox">
                                    <input type="checkbox" name="publish" id="publish" checked="" />

                                    <label className="mg-checkbox__label" htmlFor="publish">
                                        <span className="mg-checkbox--faux"></span>
                                        <span className="mg-form-element__label">Publish</span>
                                    </label>
                                </span>
                            </div>
                        </div>

                        <div className="mg-form-element mg-p-top--large mg-float--right">
                            <button onClick={this.handleCloseModal.bind(this)} className="mg-button mg-button--brand" type="button">Close</button>

                            <button className="mg-button mg-button--brand">Create Event</button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        const { name, description } = this.state

        this.props.eventCreation(name, description)
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
        eventCreation: (name, description) => {
            dispatch(eventCreation('name test', 'PUBLISHED', 'description test', '10/04/2017', '11/04/2017', 'Paris'));
        },

        changeRoute: (url) => dispatch(push(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsCreationPage);
