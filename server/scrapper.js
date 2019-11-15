import request from 'request';
import cheerio from 'cheerio';
import * as socTypes from '../src/actions/socket/socket-event-types';
import Post from './db';
import Posts from './db';

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

const crawlPost = async (post) => {
    try {
        const s_tym = Date.now(); //start time of crawling
        console.log(post.link, ' fetching');

        const pst = await Post.findOne({id : post.id}).exec();
        
        if(pst) { //db return
            const e_tym = Date.now(); //end time of crawling
            return {...pst._doc, time : e_tym - s_tym};
        }
        const postHtml = await doRequest(post.link);
        const post$ = cheerio.load(postHtml);
        
        const tags = [];
        
        post$('.r > ul > li > a').each((i, el) => {
            tags.push({
                tag : post$(el).text(),
                link : post$(el).attr('href')
            });
        })
        
        const responses = [];
        const respJson = await doRequest(`https://medium.com/_/api/posts/${post.id}/responsesStream?filter=other`)
        const resp = JSON.parse(respJson.substring(16));
        const posts = resp.payload.references.Post;
        const users = resp.payload.references.User;

        for(let p in posts) {
            const content = posts[p].previewContent.bodyModel.paragraphs.map(e => e.text).join('\n');
            const creatorId = posts[p].creatorId;
            const name = users[creatorId].name;
            responses.push({
                content,
                name,
                id : p
            })                
        }

        post.tags = tags;
        post.post = post$('article').html();
        post.loading = false;
        post.crawling = false;
        post.responses = responses;
        const e_tym = Date.now();
        post.time = e_tym - s_tym;
        await Posts.create({
            ...post
        });
        console.log(post.id, ' added in db');
        return post;
    }
    catch(err) {
        console.log('post err', err);
        return {...post, err: true, loading: false, crawling: false}        
    }
}

export const fetchArticleWithQuery = async (socket, query, cb) => {
    const {q, ind } = query;
    const count = 8; //posts to send;
    console.log(query);
    
    try {
        const html = await doRequest('https://medium.com/tag/' + q)
        
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

            const title = $(el).find('.graf--title').text();
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
                loading: true,
                crawling: false
            })
        });
        console.log('searched items length ', data.length);
        
        //check for ind
        if(ind) {
            const ret = data.slice(ind, ind+count);
            cb({data: ret, related, more: (data.length > ind+count), add: true})
        }
        else {
            const ret = data.slice(0, count);
            cb({data : ret, related, more: data.length>count}) //send current data
        }

        for(let i in data) {
            socket.emit(socTypes.LOADING_THIS, data[i].id);
            const post = await crawlPost(data[i]);
            socket.emit(socTypes.LOADED_THIS, post);
        }
    }
    catch(err) {
        console.log(err);
    }
    
};