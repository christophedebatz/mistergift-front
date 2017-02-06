import React from 'react'

import { connect } from 'react-redux';
import { login } from '../AppContainer/actions';
import { selectLogin } from '../AppContainer/selectors'

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

    componentWillMount() {
        const { changeRoute, redirect } = this.props;
        let { isAuthenticated } = this.props;

        isAuthenticated = isAuthenticated.loggedIn;

        if (Object.keys(isAuthenticated).length === 0 && isAuthenticated.constructor === Object) {
            isAuthenticated = null;
        }

        if (isAuthenticated) changeRoute(redirect);
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, changeRoute, redirect } = nextProps;
        let { isAuthenticated: wasAuthenticated } = this.props;

        const one = wasAuthenticated.loggedIn;
        const two = isAuthenticated.loggedIn;

        if (Object.keys(wasAuthenticated).length === 0 && wasAuthenticated.constructor === Object) {
            wasAuthenticated = null;
        }

        if (!one && two) changeRoute(redirect);
    }

    render() {
        return (
            <div className="site-content">
                <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                    <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                        { error ? 'error' : null }

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

    handleChangeName (event) {
        this.handleEmitChange({ ...this.props.data, name: event.target.value })
    }

    handleChangeEmail (event) {
        this.handleEmitChange({ ...this.props.data, email: event.target.value })
    }

    handleChangePassword (event) {
        this.handleEmitChange({ ...this.props.data, password: event.target.value })
    }

    handleEmitChange (newFormState) {
        this.props.dispatch(changeForm(newFormState))
    }

    handleSubmit (event) {
        event.preventDefault()
        this.props.login(this.props.data.name, this.props.data.email, this.props.data.password)
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
