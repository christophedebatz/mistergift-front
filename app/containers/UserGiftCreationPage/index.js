import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { productCreation } from '../App/actions'
import { selectProductCreation } from '../App/selectors'

import Modal from 'react-modal'

class UserGiftCreationPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            brand: '',
            url: '',
            description: '',
            modalIsOpen: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    componentWillMount() {
        this.setState({
            modalIsOpen: true
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalIsOpen: true
        });
    }

    handleCloseModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        const request = {
            name: this.state.name,
            brand: this.state.brand,
            url: this.state.url,
            description: this.state.description
        };

        this.props.productCreation(request)
    }

    render() {
        const modalStyles = {
            content: {
                bottom: 'auto',
                left: '50%',
                marginRight: '-50%',
                right: 'auto',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '25%'
            }
        };

        return (
            <Modal
                contentLabel="Add gift to my wishlist"
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleCloseModal}
                portalClassName="mg-modal"
                style={modalStyles}>

                <form className="mg-form--stacked mg-clearfix" onSubmit={this.handleSubmit}>
                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="name">Product Name</label>

                        <div className="mg-form-element__control">
                            <input
                            	className="mg-input"
                            	id="name"
                            	type="text"
                            	name="name"
                            	value={this.state.name}
                            	placeholder="Name..."
                            	onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="brand">Product Brand</label>

                        <div className="mg-form-element__control">
                            <input
                            	className="mg-input"
                            	id="brand"
                            	type="text"
                            	name="brand"
                            	value={this.state.brand}
                            	placeholder="Brand..."
                            	onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="url">Product URL</label>

                        <div className="mg-form-element__control">
                            <input
                            	className="mg-input"
                            	id="url"
                            	type="text"
                            	name="url"
                            	value={this.state.url}
                            	placeholder="http://..."
                            	onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="mg-form-element">
                        <label className="mg-form-element__label" htmlFor="description">Product Description</label>

                        <div className="mg-form-element__control">
                            <textarea
                            	className="mg-textarea"
                            	id="description"
                            	name="description"
                            	value={this.state.description}
                            	placeholder="Description..."
                            	onChange={this.handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mg-form-element mg-p-top--large mg-float--right">
                        <button onClick={this.handleCloseModal} className="mg-button" type="button">Close</button>

                        <button className="mg-button mg-button--brand">Add Gift</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

UserGiftCreationPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        data: selectProductCreation()(state),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        productCreation: (request) => {
            dispatch(productCreation(request));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserGiftCreationPage);
