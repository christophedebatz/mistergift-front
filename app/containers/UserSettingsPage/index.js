import React from 'react'
import { connect } from 'react-redux'

import { updateUser } from '../App/actions'
import { loadUserSettings } from '../App/actions'
import { selectUserSettings } from '../App/selectors'

import Loader from '../../components/Loader'

class UserSettingsPage extends React.Component {
    constructor(props, context) {
        super(props)

        this.state = {
            currentlySending: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const user = this.props.user.get('data');
        const isLoaded = this.props.user.get('isLoaded');
        const errorMessage = this.props.user.get('errorMessage');

        if (!isLoaded || typeof user == 'undefined') {
            return <Loader />;
        }

        return (
            <div className="mg-container--center mg-container--small">
                <h1 className="mg-text-heading--large mg-m-bottom--large mg-text-align--center">Settings</h1>

                <div className="mg-grid mg-grid--align-center">
                    <form className="mg-form--stacked" onSubmit={ this.handleSubmit }>
                        <div className="mg-form-element">
                            <label className="mg-form-element__label">First Name</label>

                            <div className="mg-form-element__control">
                                <input
                                    className="mg-input"
                                    type="text"
                                    name="firstName"
                                    value={ user.name }
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
                                    value={ user.name }
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
                                    value={ user.email }
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
                                    value="********"
                                    onChange={ this.handleInputChange }
                                />
                            </div>
                        </div>

                        <div className="mg-form-element mg-text-align--right">
                            <button className="mg-button mg-button--brand" disabled={ this.state.currentlySending }>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
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
        this.props.updateUser(this.state.name, this.state.email, this.state.password)
    }
}

UserSettingsPage.propTypes = {
};

const mapStateToProps = (state, props) => {
    return {
        user: selectUserSettings()(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadUserSettings())
        },

        updateUser: (firstName, lastName, email, password) => {
            dispatch(updateUser(firstName, lastName, email, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);

