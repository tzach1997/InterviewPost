import { IRouteRequestDocument, IRouteRequestModel } from "./routeRequest.types";
export async function findOneOrCreate(
  this: IRouteRequestModel
): Promise<IRouteRequestDocument> {
    return this.create({});
}

