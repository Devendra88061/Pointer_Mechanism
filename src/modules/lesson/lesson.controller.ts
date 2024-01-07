import { NextFunction, Request, Response } from "express";
import HttpException from "../../common/db/http.Exception/http.Exception";
import HttpResponse from "../../common/db/http.Response/http.Response";
import lessonServices from "./lesson.services";


class lessonController {
   
    static async addLesson(request: Request, response: Response, next: CallableFunction) {
        try {
            const lesson = request.body;
            lessonServices.addLesson(lesson, (err: any, result: any) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse(null, result, "Lesson added", null, null, null));
                }
            });
        }
        catch (err) {
            next(new HttpException(400, "Something went wrong"));
        }
    };

    static async getLessonProgress(request: Request, response: Response, next: NextFunction) {
        try {
            const userID = request.params.userId;
            console.log("userID----", userID);
           
            lessonServices.getLessonProgress(userID,(err: any, result: any) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetLessonProgress", result, "Total Lesson Progress Returned", null, null, null));
                }
            });
        } catch (err) {
            console.log(err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}
export default lessonController;