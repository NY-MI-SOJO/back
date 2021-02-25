/**
 * @author Adit Garg <adit.garg21k@gmail.com>
 * @description Fetches page at given URI and after parsing returns metadata which has tag name and content
 * @Exports {@function metaScraper}
 */
const cheerio = require('cheerio');
const fetch = require('node-fetch');


const metaScraper = async (uri) => {
    /** 
    * @description Scrapes all meta tags and 
    * @param {string} uri must be valid
    * @returns returns 2d array of name and content of tags
    * @example metaScraper(www.abc.com) returns [[nameOfTag, ContentOfTag],[nameOfTag, ContentOfTag]...]
    * @author Adit Garg <adit.garg21k@gmail.com>
    */
    const response = await fetch(uri); // fetch page
    const htmlData = await response.text();
    const $ = cheerio.load(htmlData); // loads dom into cheerio-jquery obj
    let metaElements = $('head > meta').toArray();
    metaElements = [...metaElements].reduce((store, element)=>{ // only map meta tags that have a name and content
        const name = element?.attribs?.property ?? 'NA';
        const content = element?.attribs?.content ?? 'NA';
        if (name != 'NA' && content != 'NA') store[name] = content
        return store;
    }, {});
    return metaElements;
}

module.exports = {
   metaScraper 
}