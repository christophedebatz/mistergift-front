import React from 'react'

class ProfileCard extends React.Component {
    render() {
        let className = this.props.className ? this.props.className : null;
        let user = this.props.user;

        return (
            <div className={ className }>
                { user.name }
            </div>
        )
    }
}

export default ProfileCard
