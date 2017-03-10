import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { login } from '../App/actions'
import { selectLogin } from '../App/selectors'

class LoginContainer extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
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

        const { email, password } = this.state

        this.props.login(email, password);
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

                    <div className="mg-form-element mg-m-bottom--large">
                        <label className="mg-form-element__label" htmlFor="password">Password</label>

                        <div className="mg-form-element__control">
                            <input className="mg-input" id="password" type="password" name="password" value={ this.state.password } onChange={ this.handleInputChange }/>
                        </div>
                    </div>

                    <div className="mg-form-element mg-text-align--right">
                        <button className="mg-button mg-button--brand">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

LoginContainer.contextTypes = {
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

        changeRoute: (url) => dispatch(push(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
