import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/comet', {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    id: { type: String, indexes: true, unique: true},
    title: String,
    description: String,
    link: String,
    author: String,
    date: String,
    imgURL: String,
    tags: [{
        tag : String,
        link : String
    }],
    post: String,
    responses : [
        {
            content : String,
            name : String,
            id : String
        }
    ]
})

const Posts = mongoose.model('post', postSchema);

export default Posts;