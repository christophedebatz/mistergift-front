import React from 'react'

function GiftCard(props) {
    let className = props.className ? props.className : '';

    return (
        <div className={ className }>
            <div className="mg-card">
                <div className="mg-media">
                    <div className="mg-media__figure">
                        <img src={ props.gift.product.img } width="90" />
                    </div>

                    <div className="mg-media__body">
                        <div className="mg-card__title">
                            { props.gift.product.title }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GiftCard
