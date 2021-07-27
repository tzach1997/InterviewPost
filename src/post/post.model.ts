import { model } from "mongoose";
import { IPostDocument } from "./post.types";
import PostSchema from "./post.schema";
export const PostModel = model<IPostDocument>("post", PostSchema);