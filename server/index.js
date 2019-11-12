let express = require("express");
let cors = require("cors");
let app = express();
import * as controllers from './controllers';

app.use(cors());

app.get('/init', controllers.init)
//the first api to hit which will give all the cards and user data if token is awailable

app.listen(9001, () => {
    console.log("Server running on port 9001");
});