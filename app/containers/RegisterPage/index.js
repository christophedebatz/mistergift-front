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

    render() {
        return (
            <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                    <div className="mg-form-element">
                        <label className="mg-form-element__label">First Name</label>

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
                        <label className="mg-form-element__label">Last Name</label>

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

                    <div className="mg-form-element">
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

                    <div className="mg-form-element">
                        <button className="mg-button mg-button--brand" disabled={ this.state.currentlySending }>Register</button>
                    </div>
                </form>
            </div>
        )
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.register(this.state.name, this.state.email, this.state.password)
    }
}

RegisterPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        data: selectRegister()(state),
        session: selectLogin()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (name, email, password) => {
            dispatch(register(name, email, password));
        },

        changeRoute: (url) => dispatch(push(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
