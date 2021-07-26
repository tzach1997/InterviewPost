import express from "express";
import logger from "./logger/winstonLogger";

const app = express();
const port = 8080; // default port to listen

app.put('/posts', function (req, res) {
    res.send('Post request for posts')
})

app.get('/posts', function (req, res) {
    res.send('Get request for posts')
})

app.get('/postsnumber', function (req, res) {
    res.send('Get request for postsnumber')
})

app.get('/statistics/topcreators', function (req, res) {
    res.send('Get request for topcreators')
})

app.get('/statistics/runtimes', function (req, res) {
    res.send('Get request for runtimes')
})

// start the express server
app.listen( port, () => {
    logger.log(`info`,`server started at http://localhost:${ port }`);
} );