import React from 'react';
import Helmet from 'react-helmet';
import format from 'string-format'

import { getConfig } from 'utils/config';
import { getSeoData } from 'utils/seo';

function Metas({type, data}) {
    data = Object.assign({}, data, {
        frontBaseUrl: getConfig('frontBaseUrl')
    });

    const seoDatas = getSeoData(type);

    let props = {
        htmlAttributes: {'lang': 'fr'},
        titleTemplate: seoDatas.titleTemplate,
        defaultTitle: seoDatas.defaultTitle,
        title: format(seoDatas.title, data),
        meta: []
    };

    Object.keys(seoDatas.metas).forEach(function (key) {
        let contentTemplate = seoDatas.metas[key]

        // add og title prefix
        if (key === 'og:title') {
            contentTemplate = 'MisterGift ' + contentTemplate
        }

        props.meta.push({
            name: key,
            content: format(contentTemplate, data)
        });
    });

    return <Helmet {...props} />
}

export default Metas;
