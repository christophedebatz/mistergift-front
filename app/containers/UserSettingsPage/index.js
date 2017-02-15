import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadUserSettings } from '../App/actions';

class UserSettingsPage extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        const user = this.props.user;

        return (
            <div className="site-content">
                <div className="mg-grid mg-container--center mg-container--large">
                    { user.name }
                </div>
            </div>
        );
    }
}

UserSettingsPage.propTypes = {
};

const mapStateToProps = (state, props) => {
    return {
        // user: selectCurrentUser(state, props),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadUserSettings())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);

