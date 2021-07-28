import express, { json } from "express";
import logger from "./logger/winstonLogger";
import {connect} from "./database/database"
import findTopCreators from "./services/TopCreators";
import {createPost,findPosts,numberPosts} from "./services/PostService";
import { addTime, getAvarage } from "./services/StatisticsService";
import { hrTimeToNano } from "./util";
const app = express();
const port = 8080; // default port to listen

connect();

app.use(express.json())

app.post('/posts', (req, res) => {
    const post = req.body;
    const startTime = process.hrtime();
    if(!post){
        res.send('request must body');
    } else if(!post.title){
        res.send('request must contain title');
    } else if(!post.body){
        res.send('request must contain body');
    } else if(!post.userId){ // should also check if user exist
        res.send('request must contain user');
    } else {
        createPost(post,()=>{
            res.send('Post created sucssesfuly');
            const diff = process.hrtime(startTime);
            addTime(hrTimeToNano(diff), 'savePost')
        },e =>{
            logger.log('error',JSON.stringify(e));
            res.send('Post creation failed');
        });
    }
})

app.get('/posts', (req, res) => {
    const startTime = process.hrtime();

    if(!req.query.limit){
        res.send('request must have limit');
    } else if(!req.query.start){
        res.send('request must have start');
    } else {
        const limit:number = Number(req.query.limit);
        const start:number = Number(req.query.start);

        findPosts(start,limit,posts=>{
            res.send(JSON.stringify(posts));

            const diff = process.hrtime(startTime);
            addTime(hrTimeToNano(diff), 'findPosts')
        },e =>{
            logger.log('error',JSON.stringify(e));
            res.send('faild find posts');
        });
    }
})
app.get('/postsnumber', (req, res) => {
    numberPosts(postNumber =>{
        res.send("{'postNumbers':" + postNumber + "}");
    },e =>{
        logger.log('error',JSON.stringify(e));
        res.send('faild count posts');
    });
})

app.get('/statistics/topcreators', (req, res) => {
    findTopCreators(creators =>{
        res.send("{'topCreators':"+ JSON.stringify(creators) +"}");
    },e =>{
        logger.log('error',JSON.stringify(e));
        res.send('faild find top creators');
    });
})

app.get('/statistics/runtimes', (req, res) => {
    getAvarage(requestAvarages=>{
        res.send(JSON.stringify(requestAvarages));
    },e =>{
        logger.log('error',JSON.stringify(e));
        res.send('faild get runtimes from db');
    });
})

// start the express server
app.listen( port, () => {
    logger.log(`info`,`server started at http://localhost:${ port }`);
} );