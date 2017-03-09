import React from 'react'

export const GLYPHS = {
    CARET_DOWN: require('styles/images/caret-down.svg'),
};

class Icon extends React.Component {
    render() {
        var glyph = this.props.glyph;
        var classes = this.props.classes ? this.props.classes : '';

        return (
            <svg className={`mg-icon mg-icon--small ${classes}`} dangerouslySetInnerHTML={{__html: '<use xlink:href="' + glyph + '"></use>'}}/>
        )
    }
}

export default Icon
