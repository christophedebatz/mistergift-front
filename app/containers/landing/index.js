import React from 'react' 
import PreregisterForm from '../../components/PreregisterForm';

function IndexPage(props) {
    return (
        <div className="site-landing mg-align--absolute-center mg-grid mg-grid--frame">
            <div className="mg-grid mg-grid--vertical mg-container--center mg-container--small">
                <div>
                    <h1>
                        <span>Hello.</span>
                        MisterGift is the only way to track and share your wishlists for <strong>free</strong>.
                    </h1>
                </div>
                
                <PreregisterForm />
            </div>
        </div>
    )
}

export default IndexPage
