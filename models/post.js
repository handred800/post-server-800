const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '請填寫名稱']
    },
    content: {
        type: String,
        required: [true, '請填寫內容']
    },
    image: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now,
        select:false
    }
},
{
    versionKey: false,
    collection: 'posts'
})
const Post = mongoose.model('Post', postSchema);

module.exports = Post;