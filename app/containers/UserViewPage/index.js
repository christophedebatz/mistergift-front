import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import Metas from 'components/Metas'
import Loader from '../../components/Loader'
import UserCard from '../../components/UserCard'
import Wishlist from '../../components/Wishlist'

import { selectUser } from '../App/selectors'
import { loadUser } from '../App/actions'

class UserViewPage extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const currentUser = this.props.currentUser || '';
        const user = this.props.user.get('data') || '';
        const isLoaded = this.props.user.get('isLoaded') || '';
        const errorMessage = this.props.user.get('errorMessage') || '';

        if (!isLoaded || typeof user == 'undefined') {
            return <Loader />;
        }

        const wishlistButton = currentUser.id == user.id ? <button className="mg-button mg-button--brand mg-float--right">Add +</button> : '';

        return (
            <div className="mg-container--center mg-container--small">
                <Metas
                    type="user"
                    data={{
                        description: user.name,
                        userName: user.name,
                        userIdentifier: user.id
                    }}
                />

                <UserCard currentUser={currentUser} user={user} key={user.id} classes="mg-text-align--center mg-m-bottom--large" />

                <div>
                    <h2 className="site-title mg-text-heading--large mg-m-bottom--large">
                        {wishlistButton}
                        Wishlist
                    </h2>

                    <Wishlist />
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

