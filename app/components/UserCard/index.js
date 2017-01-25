import React from 'react'

function ProfileCard(props) {
    let className = props.className ? props.className : '';

    return (
        <div className={ className }>
            { props.user.name }
        </div>
    )
}

export default ProfileCard
