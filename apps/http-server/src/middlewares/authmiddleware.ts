import {JWT_SECRET} from "@repo/backend-common/config"
import { Request,Response,NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export const Authenticate = async(req:Request,res:Response,next:NextFunction) =>{
    const header = req.headers && req.headers['authorization'] || "";
    if(!header){
        res.json({
            message: "No token provided"
        })
    }
    const decoded = jwt.verify(header,JWT_SECRET)

    if(decoded){
        (req as JwtPayload).userId = (decoded as JwtPayload).userId;
        next()
    }else{
        res.json({
            message: "Unauthorized"
        })
    }
}