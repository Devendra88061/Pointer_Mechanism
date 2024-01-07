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
            const userID = request.params.userId;
            const sessionID = request.params.sessionId;
            console.log("userID----", userID);
            console.log("sessionID----", sessionID);
            pointerServices.getPointersByUserID(userID,sessionID,(err: any, result: any) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetPointer", result, "Total pointer Returned", null, null, null));
                }
            });
        } catch (err) {
            console.log(err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    
}
export default pointerController;