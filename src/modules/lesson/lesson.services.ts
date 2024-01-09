import CrudOperations from "../../common/db/crud";
import Lesson from "../../models/lesson";


class lessonServices {
    
    // add pointers
    public static async addLesson(lesson: any, next: any) {
        try {
            const newLesson = new Lesson(lesson);
            var result = await new CrudOperations(Lesson).save(newLesson);
            return next(null, result);
        } catch (err: any) {
            return next(err, "Something went wrong!");
        }
    };

    static async getLessonProgress(userID: any, next: CallableFunction) {
        try {
            const recordCount = await new CrudOperations(Lesson).countAllDocuments({userId: userID});
            const result = await new CrudOperations(Lesson).getAllDocuments({ userId: userID }, {}, {}, {createdAt: -1});
            const response = {
                result,
                recordCount
            };
            next(null, response);
        } catch (err) {
            console.log("Error:", err);
            next("Something went wrong");
        }
    }

}
export default lessonServices;