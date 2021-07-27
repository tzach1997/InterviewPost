import { Schema } from "mongoose";
const PostSchema = new Schema({
    title: String,
    body: String,
    userId: String
});
export default PostSchema;