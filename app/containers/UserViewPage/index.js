import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import _ from 'lodash'

import Metas from 'components/Metas'
import Loader from '../../components/Loader'
import ErrorMessage from '../../components/ErrorMessage'
import UserCard from '../../components/UserCard'
import Wishlist from '../../components/Wishlist'
import Icon, { GLYPHS } from '../../components/Icon'

import { selectUser, selectUserWishlist } from '../App/selectors'
import { loadUser, loadUserWishlist } from '../App/actions'

class UserViewPage extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let currentUser = this.props.currentUser || {};
        let user = this.props.user.get('data') || {};
        let isLoaded = this.props.user.get('isLoaded') || false;
        let errorMessage = this.props.user.get('errorMessage') || null;
        let wishlist = this.props.wishlist || {};

        if (!isLoaded || _.isEmpty(user)) {
            return <Loader />;
        }

        let wishlistButton = currentUser.id == user.id ? <button className="mg-button mg-button--brand mg-float--right">Add <Icon glyph={GLYPHS.PLUS} /></button> : '';

        let wishlistItems = !_.isEmpty(wishlist) ? <Wishlist items={wishlist} /> : <ErrorMessage type="empty" />;

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

                    {wishlistItems}
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
        wishlist: selectUserWishlist()(state)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            const userId = props.params.userId;

            dispatch(loadUser(userId));
            dispatch(loadUserWishlist(userId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserViewPage);

