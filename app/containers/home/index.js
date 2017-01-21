import React from 'react'
import GiftCard from '../../components/GiftCard'

function IndexPage(props) {
    let gifts = [
        {
            id: 1,
            event: {
                title: 'Anniversaire Joulsy',
                date: new Date()
            },
            product: {
                title: 'PS4 Special Edition',
                brand: 'Sony',
                img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/c7/ed/48/4779463/1539-4.jpg',
                price: 34900,
            }
        },
        {
            id: 2,
            event: {
                title: 'Anniversaire Joulsy',
                date: new Date()
            },
            product: {
                title: 'Devialet Phantom Silver',
                brand: 'Devialet',
                img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/82/86/74/7636610/1539-1.jpg',
                price: 199900,
            }
        },
        {
            id: 3,
            event: {
                title: 'Anniversaire Joulsy',
                date: new Date()
            },
            product: {
                title: 'B&O BeoPlay A9',
                brand: 'Bang & Olufsen',
                img: 'http://static.fnac-static.com/multimedia/Images/FR/NR/1b/87/61/6391579/1539-1.jpg',
                price: 189900,
            }
        }
    ]

    let giftCards = gifts.map((gift) => {
        return (<GiftCard className="mg-large-size--1-of-2 mg-col mg-col--padded" gift={ gift } key={ gift.id } />)
    })

    return (
        <div>
            <div className="site-head--masthead">
                <div className="mg-grid mg-container--center mg-container--x-large">
                    <h1>Give a Gift easily</h1>
                    <h2>The only way to track and share your wishlists</h2>
                </div>
            </div>

            <div className="youyou">
                <div className="mg-grid mg-grid--align-spread mg-container--center mg-container--x-large">
                    <div className="mg-media">
                        <div className="mg-media__figure">
                            placekitten
                        </div>

                        <div className="mg-media__body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.</p>
                        </div>
                    </div>

                    <div className="mg-media">
                        <div className="mg-media__figure">
                            placekitten
                        </div>

                        <div className="mg-media__body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.</p>
                        </div>
                    </div>

                    <div className="mg-media">
                        <div className="mg-media__figure">
                            placekitten
                        </div>

                        <div className="mg-media__body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur sapiente. Modi veritatis totam accusantium numquam assumenda.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-gifts-list">
                <div className="mg-grid mg-container--center mg-container--x-large">
                    { giftCards }
                </div>
            </div>
        </div>
    )
}

export default IndexPage
