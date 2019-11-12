import express from "express";
import cors from "cors";
import HTTP from 'http';
import Socket from 'socket.io';
import * as controllers from './controllers';
import * as scrapper from './scrapper';

let app = express();
var http = HTTP.createServer(app);
var io = Socket(http);

app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//the first api to hit which will give all the cards and user data if token is awailable
app.get('/init', async (req, res, next) => {
    console.log(req.query);
    const data = await scrapper.fetchArticleWithQuery(req.query.q);    
    res.send(data)
});

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(9001, () => {
    console.log("Server running on port 9001");
});