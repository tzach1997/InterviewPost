import { RouteRequestModel } from "../route/routeRequest.model";
import { ResultFunction,ErrorFunction } from "./types";

function addTime(runnigTime:any,route:any){
    RouteRequestModel.create({route,runTime:runnigTime});
}

const pipeline = [
    {
        "$group": {
            "_id": {
                "route": "$route"
            },
            "AVG(runTime)": {
                "$avg": "$runTime"
            }
        }
    },
    {
        "$project": {
            "route": "$_id.route",
            "AVG(runTime)": "$AVG(runTime)",
            "_id": 0
        }
    }
];


function getAvarage(result:ResultFunction,error:ErrorFunction){
    RouteRequestModel.aggregate(pipeline).then(result,error);
}

export {addTime,getAvarage};