import React from 'react'

class WishlistItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let classes = this.props.classes ? this.props.classes : '';
        let item = this.props.wishlistItem;

        return (
            <div className={`mg-card ${classes} mg-m-bottom--large`}>
                <div className="mg-media mg-media--center">
                    <div className="mg-media__figure">
                        <img src={ item.product.img } width="90" />
                    </div>

                    <div className="mg-media__body">
                        <div className="mg-card__title">
                            { item.product.title }
                        </div>

                        <div className="mg-card__content mg-card__brand">
                            { item.product.brand }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WishlistItem
