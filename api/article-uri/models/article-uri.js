'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const fetch = require('node-fetch');
const{ metaScraper} = require('../../../metaScraper');
const { sanitizeEntity } = require('strapi-utils');
const { convertRestQueryParams } = require('strapi-utils');

 
module.exports = {
    lifecycles: {
        async afterCreate(result, data) {
            // console.log({result, data
            const metadata = await metaScraper(data.URI);
            const articleObj = {
                Title: metadata['og:title'],
                Description:  metadata['og:description'],
                Source:  metadata['og:site_name'],
                Image: metadata['og:image'],
                URI: data.URI
            }
           
            console.log(articleObj)
            strapi.query('Article').create(articleObj);
        }
    }
};
