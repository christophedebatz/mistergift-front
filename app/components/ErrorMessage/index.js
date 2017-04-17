import React from 'react'

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        let classes = this.props.classes ? this.props.classes : '';
        let type = this.props.type ? this.props.type : '';
        let text;

        if (type == 'empty') {
        	text = 'No gifts have been added yet.';
        } else {
        	text = 'Error message';
        }

        return (
			<div className={`mg-text-align--center ${classes}`}>
				{text}
			</div>
		)
    }
}

export default ErrorMessage
