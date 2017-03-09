import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import Metas from 'components/Metas'
import Loader from '../../components/Loader'
import UserCard from '../../components/UserCard'

import { selectUser, selectCurrentUser } from '../App/selectors'
import { loadUser, loadCurrentUser } from '../App/actions'

class UserViewPage extends React.Component {
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
            <div>
                <Metas
                    type="user"
                    data={{
                        description: user.name,
                        userName: user.name,
                        userIdentifier: user.id
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

const mapStateToProps = (state, props) => {
    return {
        user: selectUser()(state),
        currentUser: selectCurrentUser()(state)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            const userId = props.params.userId;
            dispatch(loadUser(userId));
            dispatch(loadCurrentUser());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserViewPage);

