import React from 'react'

import { connect } from 'react-redux';
import { register } from '../AppContainer/actions';
import { selectRegister } from '../AppContainer/selectors'

const HTTP_ERR_CONFLICT = 409

class RegisterContainer extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div className="site-content">
                <div className="mg-grid mg-grid--align-center mg-container--center mg-container--small">
                    <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label">Name</label>

                            <div className="mg-form-element__control">
                                <input
                                    className="mg-input"
                                    type="text"
                                    name="name"
                                    value={ this.state.name }
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
            </div>
        )
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
        this.props.register(this.state.name, this.state.email, this.state.password)
    }
}

RegisterContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        data: selectRegister()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (name, email, password) => {
            dispatch(register(name, email, password));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
