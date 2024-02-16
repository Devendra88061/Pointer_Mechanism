import { NextFunction, Request, Response } from "express";
import HttpException from "../../common/db/http.Exception/http.Exception";
import HttpResponse from "../../common/db/http.Response/http.Response";
import pointerServices from "./pointer.services";


class pointerController {
   
    static async addPointer(request: Request, response: Response, next: CallableFunction) {
        try {
            const pointer = request.body;
            pointerServices.addPointer(pointer, (err: any, result: any) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse(null, result, "Pointer added", null, null, null));
                }
            });
        }
        catch (err) {
            next(new HttpException(400, "Something went wrong"));
        }
    }

    // Get pointers
    static async getPointersByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const userID = request.query.userId;
            const sessionID = request.query.sessionId;
            const language = request.query.language
            if (userID == "null") {
                response.status(400).send(new HttpResponse(null, null,"userId is not be null", null,null,null));
            }
            else if (sessionID == "null") {
                response.status(400).send(new HttpResponse(null, null,"sessionId is not be null", null,null,null));
            }
            else if (language == "null") {
                response.status(400).send(new HttpResponse(null, null,"language is not be null", null,null,null));
            }else{
                pointerServices.getPointersByUserID(userID,sessionID,language,(err: any, result: any) => {
                    if (err) {
                        next(new HttpException(400, err));
                    } else {
                        response.status(200).send(new HttpResponse("GetPointer", result, "Total pointer Returned", null, null, null));
                    }
                });
            }  
        } catch (err) {
            console.log(err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    
}
export default pointerController;