import React from 'react'

import { connect } from 'react-redux';
import { Auth } from '../../actions'

class LoginContainer extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = { login: '', password: '' }
        this.router = context.router
    }

    updateState = (data) => {
        this.setState({ ...this.state, ...data })
    }

    handleLoginChange = (event) => {
        this.updateState({ login: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.updateState({ password: event.target.value })
    }

    submit = (event) => {
        event.preventDefault()

        Auth.login(this.state.login, this.state.password)
            .then((auth) => {
                let path = '/'
                this.router.push(path)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        return (
            <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                <form className="mg-form--stacked" onSubmit={ this.submit }>
                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="email">Login</label>

                        <div className="mg-form-element__control">
                            <input className="mg-input" id="email" type="email" name="login" value={ this.state.login } onChange={ this.handleLoginChange }/>
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="password">Password</label>

                        <div className="mg-form-element__control">
                            <input className="mg-input" id="password" type="password" name="password" value={ this.state.password } onChange={ this.handlePasswordChange }/>
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <button className="mg-button mg-button--brand">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

LoginContainer.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);