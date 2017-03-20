import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { register } from '../App/actions'
import { selectLogin, selectRegister } from '../App/selectors'

class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            currentlySending: false,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        const { changeRoute } = this.props;
        const { session } = this.props;

        let isAuthenticated = session.get('loggedIn');

        if (Object.keys(isAuthenticated).length === 0 && isAuthenticated.constructor === Object) {
            isAuthenticated = null;
        }

        if (isAuthenticated) changeRoute('/');
    }

    componentWillReceiveProps(nextProps) {
        const { changeRoute } = nextProps;
        const { session } = this.props;

        let isAuthenticated = session.get('loggedIn');

        if (Object.keys(isAuthenticated).length === 0 && isAuthenticated.constructor === Object) {
            isAuthenticated = null;
        }

        if (isAuthenticated) changeRoute('/');
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()

        const { firstName, lastName, email, password } = this.state

        this.props.login(firstName, lastName, email, password);
    }

    render() {
        return (
            <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                    <div className="mg-form-element">
                        <label className="mg-form-element__label">Name</label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="text"
                                name="firstName"
                                value={ this.state.firstName }
                                onChange={ this.handleInputChange }
                            />
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label">Name</label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="text"
                                name="lastName"
                                value={ this.state.lastName }
                                onChange={ this.handleInputChange }
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
                                onChange={ this.handleInputChange }
                            />
                        </div>
                    </div>

                    <div className="mg-form-element mg-m-bottom--large">
                        <label className="mg-form-element__label">Password</label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="password"
                                name="password"
                                value={ this.state.password }
                                onChange={ this.handleInputChange }
                            />
                        </div>
                    </div>

                    <div className="mg-form-element mg-text-align--right">
                        <button className="mg-button mg-button--brand" disabled={ this.state.currentlySending }>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

RegisterPage.contextTypes = {
};

const mapStateToProps = (state, props) => {
    return {
        data: selectRegister()(state),
        session: selectLogin()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (firstName, lastName, email, password) => {
            dispatch(register(firstName, lastName, email, password));
        },

        changeRoute: (url) => dispatch(push(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
