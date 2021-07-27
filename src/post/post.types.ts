import { Document, Model } from "mongoose";
export interface IPost {
    title: string,
    body: string,
    userId: string
}
export interface IPostDocument extends IPost, Document {}
export interface IPostModel extends Model<IPostDocument> {}