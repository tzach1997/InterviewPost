import { IPostDocument, IPostModel } from "./post.types";
export async function findOneOrCreate(
  this: IPostModel
): Promise<IPostDocument> {
    return this.create({});
}

