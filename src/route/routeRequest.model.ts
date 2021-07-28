import { model } from "mongoose";
import { IRouteRequestDocument as IRouteRequestDocument } from "./routeRequest.types";
import RouteRequestSchema from "./routeRequest.schema";
export const RouteRequestModel = model<IRouteRequestDocument>("routeRequest", RouteRequestSchema);