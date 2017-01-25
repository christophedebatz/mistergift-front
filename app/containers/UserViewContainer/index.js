import React from 'react';
import { Link } from 'react-router';
import Metas from 'components/Metas';

import { connect } from 'react-redux';

import UserCard from '../../components/UserCard'

import { selectCurrentUser } from './selectors';
import { loadUser } from './actions';

class UserViewContainer extends React.Component {
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
                <Metas
                    type="user"
                    data={{
                        description: 'lorem',
                        userName: 'ipsum',
                        userIdentifier: 'dolor'
                    }}
                />

                <div className="mg-grid mg-container--center mg-container--x-large">
                    <UserCard user={ user } key={ user.id } />
                </div>
            </div>
        );
    }
}

UserViewContainer.propTypes = {
};

const mapStateToProps = (state, props) => {
    return {
        user: selectCurrentUser(state, props),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            const identifier = props.params.identifier;
            dispatch(loadUser(identifier))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserViewContainer);

