import express, { json } from "express";
import logger from "./logger/winstonLogger";
import {connect} from "./database/database"
import { PostModel } from "./post/post.model";

const app = express();
const port = 8080; // default port to listen

connect();

app.use(express.json())

app.post('/posts', (req, res) => {
    const post = req.body;
    if(!post){
        res.send('request must body');
    } else if(!post.title){
        res.send('request must contain title');
    } else if(!post.body){
        res.send('request must contain body');
    } else if(!post.userId){ // should also check if user exist
        res.send('request must contain user');
    } else {
        PostModel.create(post).then(()=>{
            res.send('Post created sucssesfuly');
        },e =>{
            logger.log('error',JSON.stringify(e));
            res.send('Post creation failed');
        });
    }
})

app.get('/posts', (req, res) => {

    if(!req.query.limit){
        res.send('request must have limit');
    } else if(!req.query.start){
        res.send('request must have start');
    } else {
        const limit:number = Number(req.query.limit);
        const start:number = Number(req.query.start);

        PostModel.find().skip(start).limit(limit).then(posts=>{
            res.send(JSON.stringify(posts));
        },e =>{
            logger.log('error',JSON.stringify(e));
            res.send('faild find posts');
        });
    }
})
app.get('/postsnumber', (req, res) => {
    PostModel.count().then(postNumber =>{
        res.send("{'postNumbers':" + postNumber + "}");
    },e =>{
        logger.log('error',JSON.stringify(e));
        res.send('faild count posts');
    });
})

app.get('/statistics/topcreators', (req, res) => {
    const pipeline = [
        {
            "$group": {
                "_id": {
                    "userId": "$userId"
                },
                "COUNT(*)": {
                    "$sum": 1
                }
            }
        },
        {
            "$project": {
                "userId": "$_id.userId",
                "COUNT(*)": "$COUNT(*)",
                "_id": 0
            }
        },
        {
            "$sort": {
                "COUNT(*)": 1
            }
        },
        {
            "$project": {
                "_id": 0,
                "userId": "$userId"
            }
        },
        {
            "$limit": 10
        }
    ];

    PostModel.aggregate(pipeline).then(creators =>{
        res.send("{'topCreators':"+ JSON.stringify(creators) +"}");
    },e =>{
        logger.log('error',JSON.stringify(e));
        res.send('faild find top creators');
    });
})

app.get('/statistics/runtimes', (req, res) => {
    res.send('Get request for runtimes')
})

// start the express server
app.listen( port, () => {
    logger.log(`info`,`server started at http://localhost:${ port }`);
} );