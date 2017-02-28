import React from 'react'

import { connect } from 'react-redux';
import { login } from '../App/actions';
import { selectLogin } from '../App/selectors'

class LoginContainer extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.router = context.router
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="email">Email</label>

                        <div className="mg-form-element__control">
                            <input className="mg-input" id="email" type="email" name="email" value={ this.state.email } onChange={ this.handleInputChange }/>
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="password">Password</label>

                        <div className="mg-form-element__control">
                            <input className="mg-input" id="password" type="password" name="password" value={ this.state.password } onChange={ this.handleInputChange }/>
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
        session: selectLogin()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (email, password) => {
            dispatch(login(email, password));
        },

        changeRoute: (url) => dispatch(push(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
