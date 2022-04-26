const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// model
const Post = require('./models/post');

const { successHandler, errorHandler } = require('./responseHandler');
const bodyparser = require('./bodyparser');

dotenv.config({path: './config.env'});
const DB = process.env.DB.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB)
    .then(() => {
        console.log('connect')
    })

const requestListener = async (req, res) => {
    const method = req.method;
    const url = req.url;
    const params = url.split('/').slice(1); // 第一個 "/" 不算

    const category = params[0] || null;
    const id = params[1] !== undefined ? params[1] : null;

    if (category === 'posts') {
        switch (method) {
            case 'GET': {
                const data = await Post.find();
                successHandler(res, data);
                break;
            }
            case 'DELETE': {
                Post.deleteMany()
                    .then(() => Post.find())
                    .then((data) => successHandler(res, data))
                    .catch((error) => errorHandler(res, error.message))
                break;
            }
            default:
                errorHandler(res, 'bad request');
                break;
        }
    } else if (category === 'post') {
        switch (method) {
            case 'POST': {
                const newPost = await bodyparser(req)
                Post.create(newPost)
                    .then(() => Post.find())
                    .then((data) => successHandler(res, data))
                    .catch((error) => errorHandler(res, error.message))
                break;
            }
            case 'DELETE': {
                if(id === null) errorHandler(res, '查無ID');
                Post.findByIdAndDelete(id)
                    .then(() => Post.find())
                    .then((data) => successHandler(res, data))
                    .catch((error) => errorHandler(res, error.message))
                break;
            }
            case 'PATCH': {
                if(id === null) errorHandler(res, '查無ID');
                bodyparser(req)
                    .then((data) => Post.findByIdAndUpdate(id, data))
                    .then(() => Post.find())
                    .then((data) => successHandler(res, data))
                    .catch((error) => errorHandler(res, error.message))
                break;
            }
            default:
                errorHandler(res, 'bad request')
                break;
        }
    } else {
        errorHandler(res, '錯誤的路由')
    }
}


const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3000);