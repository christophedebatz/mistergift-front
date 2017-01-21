import React from 'react'
import { Preregister } from '../../services'

const HTTP_ERR_CONFLICT = 409

class PreregisterForm extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = { email: '', emailSaved: false, emailAlreadySaved: false, submitInProgress: false }
        this.router = context.router
    }

    updateState = (data) => {
        this.setState({ ...this.state, ...data })
    }

    handleEmailChange = (event) => {
        this.updateState({ email: event.target.value })
    }

    submit = (event) => {
        event.preventDefault()

        this.updateState({ submitInProgress: true })

        Preregister
            .preregister(this.state.email)
            .then((user) => {
                this.updateState({ emailSaved: true })
            })
            .catch((err) => {
                if (err.status === HTTP_ERR_CONFLICT) this.updateState({ emailAlreadySaved: true })
            })
            .then(() => {
                this.updateState({ submitInProgress: false })
            })
    }

    render() {
        let isAlreadyRegistered = ''

        if (this.state.emailAlreadySaved)
            isAlreadyRegistered = (
                <div className="mg-text-body--regular site-landing--error">
                    You already registered your email here, thank you!
                </div>
            )

        let isSaved = (
            <div className="mg-form-element__control mg-input-has-fixed-addon">
                <input className="mg-input" type="email" name="email" placeholder="Your email, e.g. santaclaus@laponie.yeah" value={ this.state.email } onChange={ this.handleEmailChange }/>

                <div className="mg-form-element__addon">
                    <button className="mg-button mg-button--neutral mg-truncate" disabled={ this.state.submitInProgress }>
                        Notify me!
                    </button>
                </div>
            </div>
        )

        if (this.state.emailSaved)
            isSaved = (
                <div className="site-landing--success">
                    Thank you for showing us your support! Your email has been successfully saved and we will contact you very soon!
                </div>
            )


        return (
            <form className="mg-form--stacked" onSubmit={ this.submit }>
                <div className="mg-form-element">
                    { isAlreadyRegistered }
                    { isSaved }
                </div>

                <div className="mg-text-body--small">Be notified when the website will be online!</div>

                <div className="mg-text-body--small">(We will not be sending any spams)</div>
            </form>
        )
    }
}

PreregisterForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default PreregisterForm
