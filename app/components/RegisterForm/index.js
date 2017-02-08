import React from 'react'

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
    }

    render() {
        return (
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
        )
    }
}

RegisterForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RegisterForm
