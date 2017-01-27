import React from 'react'

import { connect } from 'react-redux';
import { Register } from '../../actions'

const HTTP_ERR_CONFLICT = 409

class RegisterForm extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            form: { email: '', password: '', name: '' },
            submitInProgress: false,
            saved: false,
            alreadyExists: false
        }

        this.router = context.router
    }

    updateState = (data) => {
        this.setState({ ...this.state, ...data })
    }

    handleNameChange = (event) => {
        this.updateState({ name: event.target.value })
    }

    handleEmailChange = (event) => {
        this.updateState({ email: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.updateState({ password: event.target.value })
    }

    submit = (event) => {
        event.preventDefault()

        this.updateState({ submitInProgress: true })

        Register.register(this.state)
            .then((user) => {
                this.updateState({ saved: true })
                alert('Successfully saved!')
            .catch((res) => {
                if (res.status === HTTP_ERR_CONFLICT) {
                    this.updateState({ alreadyExists: true })
                }
            })
            .then(() => this.updateState({ submitInProgress: false }))
    }

    render() {
        return (
            <div className="site-content">
                <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                    <form className="mg-form--stacked" onSubmit={ this.submit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label">Name</label>

                            <div className="mg-form-element__control">
                                <input
                                    className="mg-input"
                                    type="text"
                                    name="name"
                                    value={ this.state.name }
                                    onChange={ this.handleNameChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <label className="mg-form-element__label">E-mail</label>

                            <div className="mg-form-element__control">
                                <input
                                    className="mg-input"
                                    type="email"
                                    name="email"
                                    value={ this.state.email }
                                    onChange={ this.handleEmailChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <label className="mg-form-element__label">Password</label>

                            <div className="mg-form-element__control">
                                <input
                                    className="mg-input"
                                    type="password"
                                    name="password"
                                    value={ this.state.password }
                                    onChange={ this.handlePasswordChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element">
                            <button className="mg-button mg-button--brand" disabled={ this.state.submitInProgress }>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

RegisterContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
