import React from 'react'

import WishlistItem from '../WishlistItem'

class Wishlist extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let classes = this.props.classes ? this.props.classes : '';

        let wishlistItems = [
            {
                id: 1,
                product: {
                    title: 'PS4 Special Edition',
                    brand: 'Sony',
                    img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/c7/ed/48/4779463/1539-4.jpg',
                    price: 34900,
                }
            },
            {
                id: 2,
                product: {
                    title: 'Devialet Phantom Silver',
                    brand: 'Devialet',
                    img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/82/86/74/7636610/1539-1.jpg',
                    price: 199900,
                }
            },
            {
                id: 3,
                product: {
                    title: 'B&O BeoPlay A9',
                    brand: 'Bang & Olufsen',
                    img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/1b/87/61/6391579/1539-1.jpg',
                    price: 189900,
                }
            }
        ]

        let wishlistItem = wishlistItems.map((wishlistItem) => {
            return (<WishlistItem className="mg-large-size--1-of-2 mg-col mg-col--padded" wishlistItem={wishlistItem} key={wishlistItem.id} />)
        })

        return (
            <div className={`${classes}`}>
                {wishlistItem}
            </div>
        )
    }
}

export default Wishlist
