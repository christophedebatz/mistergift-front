import React from 'react'
import { Link } from 'react-router'
import AvatarPlaceholder from 'styles/images/avatar.png'

class ProfileCard extends React.Component {
    render() {
        const currentUser = this.props.currentUser;
        let classes = this.props.classes ? this.props.classes : null;
        let user = this.props.user;

        let settingsButton = currentUser.id == user.id ? (
            <Link to="/settings" className="mg-button mg-button--brand">Edit my profile</Link>
        ) : null;

        return (
            <div className={`mg-profile ${classes}`}>
                <img className="mg-profile__avatar" src={AvatarPlaceholder} />
                <h1 className="mg-text-heading--large mg-m-bottom--large">{ user.firstName + ' ' + user.lastName }</h1>

                {settingsButton}
            </div>
        )
    }
}

export default ProfileCard
