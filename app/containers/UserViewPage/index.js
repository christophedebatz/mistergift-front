import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Metas from 'components/Metas';
import UserCard from '../../components/UserCard';

import { selectCurrentUser } from '../App/selectors';
import { loadUser } from '../App/actions';

class UserViewPage extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const user = this.props.user.get('data');
        const isLoaded = this.props.user.get('isLoaded');
        const errorMessage = this.props.user.get('errorMessage');

        if (!isLoaded) {
            return null;
        }

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

                <div className="mg-grid mg-container--center mg-container--small">
                    <UserCard user={ user } key={ user.id } />
                </div>
            </div>
        );
    }
}

UserViewPage.propTypes = {
};

const mapStateToProps = (state) => {
    return {
        user: selectCurrentUser()(state)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            const userId = props.params.userId;
            dispatch(loadUser(userId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserViewPage);

