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
            password: '',
            passwordConfirm: '',
            formErrors: {firstName: '', lastName: '', email: '', password: '', passwordConfirm: ''},
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            formValid: false
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
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value)
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {firstName, lastName, email, password} = this.state

        this.props.register(firstName, lastName, email, password);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let passwordConfirmValid = this.state.passwordConfirmValid;

        switch(fieldName) {
            case 'firstName':
                firstNameValid = value != '';
                fieldValidationErrors.firstName = firstNameValid ? '' : 'Required field cannot be left blank';

                break;
            case 'lastName':
                lastNameValid = value != '';
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Required field cannot be left blank';

                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Invalid e-mail address';

                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': 'Your password is too short';

                break;
            case 'passwordConfirm':
                passwordConfirmValid = value == this.state.password;
                fieldValidationErrors.passwordConfirm = passwordConfirmValid ? '': 'Password does not match';

                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordConfirmValid: passwordConfirmValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.firstNameValid &&
                this.state.lastNameValid &&
                this.state.emailValid &&
                this.state.passwordValid &&
                this.state.passwordConfirmValid
        });
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'mg-has-error');
    }

    render() {
        return (
            <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                <form className="mg-form--stacked" onSubmit={this.handleSubmit}>
                    <div className={`mg-form-element ${this.errorClass(this.state.formErrors.firstName)}`}>
                        <label className="mg-form-element__label">
                            First Name
                        </label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {this.errorClass(this.state.formErrors.firstName) &&
                            (<div className="mg-form-element__help">{this.state.formErrors.firstName}</div>)
                        }
                    </div>

                    <div className={`mg-form-element ${this.errorClass(this.state.formErrors.lastName)}`}>
                        <label className="mg-form-element__label">
                            Last Name
                        </label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {this.errorClass(this.state.formErrors.lastName) &&
                            (<div className="mg-form-element__help">{this.state.formErrors.lastName}</div>)
                        }
                    </div>

                    <div className={`mg-form-element ${this.errorClass(this.state.formErrors.email)}`}>
                        <label className="mg-form-element__label">
                            E-mail
                        </label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {this.errorClass(this.state.formErrors.email) &&
                            (<div className="mg-form-element__help">{this.state.formErrors.email}</div>)
                        }
                    </div>

                    <div className={`mg-form-element ${this.errorClass(this.state.formErrors.password)}`}>
                        <label className="mg-form-element__label">
                            Password
                        </label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {this.errorClass(this.state.formErrors.password) &&
                            (<div className="mg-form-element__help">{this.state.formErrors.password}</div>)
                        }
                    </div>

                    <div className={`mg-form-element mg-m-bottom--large ${this.errorClass(this.state.formErrors.passwordConfirm)}`}>
                        <label className="mg-form-element__label">
                            Confirm Password
                        </label>

                        <div className="mg-form-element__control">
                            <input
                                className="mg-input"
                                type="password"
                                name="passwordConfirm"
                                value={this.state.passwordConfirm}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        {this.errorClass(this.state.formErrors.passwordConfirm) &&
                            (<div className="mg-form-element__help">{this.state.formErrors.passwordConfirm}</div>)
                        }
                    </div>

                    <div className="mg-form-element mg-text-align--right">
                        <button className="mg-button mg-button--brand" disabled={!this.state.formValid}>Register</button>
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
