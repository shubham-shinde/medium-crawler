import express from "express";
import cors from "cors";
import HTTP from 'http';
import Socket from 'socket.io';
import * as controllers from './controllers';
import * as scrapper from './scrapper';
import * as socTypes from '../src/actions/socket/socket-event-types';

let app = express();
var http = HTTP.createServer(app);
var io = Socket(http);

app.use(cors());
app.use(express.static(__dirname + '/../dist/'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../dist/index.html');
});
//the first api to hit which will give all the cards and user data if token is awailable
// app.get('/init', async (req, res, next) => {
//     console.log(req.query);
//     const data = await scrapper.fetchArticleWithQuery(req.query.q);    
//     res.send(data)
// });

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on(socTypes.QUERY_SEARCH, function (query, cb) {
        scrapper.fetchArticleWithQuery(socket, query, cb);
    })
});

http.listen(9001, () => {
    console.log("Server running on port 9001");
});