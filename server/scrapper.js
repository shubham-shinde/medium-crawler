import request from 'request';
import cheerio from 'cheerio';
import * as socTypes from '../src/actions/socket/socket-event-types';

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}


export const fetchArticleWithQuery = async (socket, query, cb) => {
    const html = await doRequest('https://medium.com/tag/' + query)
    
    const $ = cheerio.load(html);
    
    const related = [];
    $('.tags--postTags').children().each((i, el) => {
        related.push({
            tag : $(el).text(),
            link : $(el).children().attr('href')
        });
    })
    
    const data = [];
    $('.postArticle').each((i, el) => {

        const title = $(el)
            .find('.graf--title')
            .text();

        const id = $(el).attr('data-post-id')

        const description = $(el).find('.graf--trailing').text();

        const link = $(el).find('.postArticle-content').parent().attr('href');

        const author = $(el).find('.postMetaInline').find('[data-action=show-user-card]').text();

        const date = $(el).find('time').text();

        const readingTime = $(el).find('.readingTime').attr('title');

        const imgURL = $(el).find('.graf-image').attr('src');

        data.push({
            id,
            title,
            description,
            link,
            author,
            date,
            readingTime,
            imgURL,
        })

    });

    cb({data, related}) //send current data

    for(let i in data) {
        socket.emit(socTypes.LOADING_THIS, data[i].id);

        console.log(data[i].link);
        
        const post = await doRequest(data[i].link);
        const post$ = cheerio.load(post);
        
        const tags = [];
        
        post$('.r > ul > li > a').each((i, el) => {
            tags.push({
                tag : $(el).text(),
                link : $(el).attr('href')
            });
        })

        data[i].tags = tags;
        data[i].post = post$('body').html();

        socket.emit(socTypes.LOADED_THIS, data[i]);
    }
};