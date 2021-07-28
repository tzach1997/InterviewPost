import { PostModel } from "../post/post.model";
import { ResultFunction,ErrorFunction } from "./types";
function createPost(post: any ,callback: ResultFunction, error: ErrorFunction){
    PostModel.create(post).then(callback,error);
}

function findPosts(start:number,limit:number,callback: ResultFunction, error: ErrorFunction){
    PostModel.find().skip(start).limit(limit).then(callback,error);
}


function numberPosts(callback: ResultFunction, error: ErrorFunction){
    PostModel.count().then(callback,error);
}

export {createPost,findPosts,numberPosts};