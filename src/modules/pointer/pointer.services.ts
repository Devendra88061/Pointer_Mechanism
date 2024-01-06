import CrudOperations from "../../common/db/crud";
import Pointer from "../../models/pointer";


class pointerServices {

    // add pointers
    public static async addPointer(pointer: any, next: CallableFunction) {
        try {
            const newPointer = new Pointer(pointer);
            const result = await new CrudOperations(Pointer).save(newPointer)
            return next(null, result);
        }
        catch (err: any) {
            return next(err, "Something went wrong!");
        }
    };

    // get Pointers
    static async getPointersByUserID(userID: any, next: CallableFunction) {
        try {
            console.log("userId---", userID);
            const result = await new CrudOperations(Pointer).getAllDocuments({ userId: userID }, {}, {}, {});
            const totalCount = result.reduce((total: any, doc: any) => total + (doc.points || 0), 0);

            const response = {
                totalCount,
                result,
            };
            next(null, response);
        } catch (err) {
            console.log("Error:", err);
            next("Something went wrong");
        }
    }
}

export default pointerServices;