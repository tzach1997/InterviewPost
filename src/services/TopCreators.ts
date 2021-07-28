import { PostModel } from "../post/post.model";
import { ResultFunction,ErrorFunction } from "./types";

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

function findTopCreators(callback: ResultFunction, error: ErrorFunction){
    return PostModel.aggregate(pipeline).then(callback,error);
}

export default findTopCreators;