import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="site-head--masthead">
                    <div className="mg-container--center mg-container--x-large">
                        <h1>Give a Gift easily</h1>
                        <h2>The only way to track and share your wishlist</h2>
                        <Link to="/register" className="mg-button mg-button--brand">Create an account</Link>
                    </div>
                </div>

                <div className="site-head--hint">
                    <div className="mg-grid mg-grid--align-space mg-container--center mg-container--x-large">
                        <div className="mg-large-size--1-of-3 mg-col mg-col--padded mg-media">
                            <div className="mg-media__body">
                                <h1 className="mg-media__title">Wishlist</h1>
                                <p className="mg-media__content">Create your whishlist</p>
                            </div>
                        </div>

                        <div className="mg-large-size--1-of-3 mg-col mg-col--padded mg-media">
                            <div className="mg-media__body">
                                <h1 className="mg-media__title">Events</h1>
                                <p className="mg-media__content">Share it by participating to life events</p>
                            </div>
                        </div>

                        <div className="mg-large-size--1-of-3 mg-col mg-col--padded mg-media">
                            <div className="mg-media__body">
                                <h1 className="mg-media__title">Contribute</h1>
                                <p className="mg-media__content">Take part to other people gifts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HomePageContainer.propTypes = {
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
        }
    };
};

const mapStateToProps = (state, props) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);