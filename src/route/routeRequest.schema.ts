import { Schema } from "mongoose";
const RouteRequestSchema = new Schema({
    route: String,
    runTime: Number
});
export default RouteRequestSchema;