import React from 'react'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let date = new Date().getFullYear();

        return (
            <div className="site-foot mg-text-body--small">
                <div className="mg-grid mg-grid--align-spread mg-container--center mg-container--x-large mg-p-horizontal--small">
                    &copy; {date} MisterGift
                </div>
            </div>
        )
    }
}

export default Footer
