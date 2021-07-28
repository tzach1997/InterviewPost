import { Document, Model } from "mongoose";
export interface IRouteRequest {
    route: string,
    runTime: number
}
export interface IRouteRequestDocument extends IRouteRequest, Document {}
export interface IRouteRequestModel extends Model<IRouteRequestDocument> {}