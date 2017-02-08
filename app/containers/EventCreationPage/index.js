import React from 'react'
import Modal from 'react-modal';

class EventsCreationPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            modalIsOpen: false
        };
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

    updateState = (data) => {
        this.setState({ ...this.state, ...data })
    }

    handleNameChange = (event) => {
        this.updateState({ name: event.target.value })
    }

    submit = (event) => {
        event.preventDefault()
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

                    <form className="mg-form--stacked" onSubmit={ this.submit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="name">Name</label>

                            <div className="mg-form-element__control">
                                <input className="mg-input" id="name" type="text" name="name" value={ this.state.name } onChange={ this.handleNameChange }/>
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <button onClick={this.handleCloseModal.bind(this)} className="mg-button" type="button">close</button>

                            <button className="mg-button mg-button--brand">Create Event</button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default EventsCreationPage
