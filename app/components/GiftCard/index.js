import React from 'react'

class GiftCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render {
        let className = this.props.className ? this.props.className : null;
        let gift = this.props.gift;

        return (
            <div className={ className }>
                <div className="mg-card">
                    <div className="mg-media mg-media--center">
                        <div className="mg-media__figure">
                            <img src={ gift.product.img } width="90" />
                        </div>

                        <div className="mg-media__body">
                            <div className="mg-card__title">
                                { gift.product.title }
                            </div>

                            <div className="mg-card__content mg-card__brand">
                                { gift.product.brand }
                            </div>

                            <time dateTime="" className="mg-card__time">12 minutes ago</time>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GiftCard
