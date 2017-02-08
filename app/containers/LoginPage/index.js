import React from 'react'

import { connect } from 'react-redux';
import { login } from '../App/actions';
import { selectLogin } from '../App/selectors'

class LoginContainer extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }

        this.router = context.router
    }

    updateState = (data) => {
        this.setState({ ...this.state, ...data })
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

        this.props.login(this.state.login, this.state.password);
    }

    render() {
        return (
            <div className="site-content">
                <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                    <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label" htmlFor="email">Login</label>

                            <div className="mg-form-element__control">
                                <input className="mg-input" id="email" type="email" name="login" value={ this.state.login } onChange={ this.handleInputChange }/>
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
