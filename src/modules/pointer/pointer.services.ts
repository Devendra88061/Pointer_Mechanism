import CrudOperations from "../../common/db/crud";
import Pointer from "../../models/pointer";


class pointerServices {

    // add pointers
    public static async addPointer(pointer: any, next: any) {
        try {
            const newPointer = new Pointer(pointer);
            var result = await new CrudOperations(Pointer).save(newPointer);

            const userID = result.userId;
            const sessionID = result.sessionId;

            const pointerUserData = await new CrudOperations(Pointer).getAllDocuments({ userId: userID }, {}, {}, {});
            const pointerSessionData = await new CrudOperations(Pointer).getAllDocuments({ sessionId: sessionID }, {}, {}, {});

            result = result.toObject();

            const totalUserPointer = pointerUserData.reduce((total: any, doc: any) => total + (doc.points || 0), 0);
            const totalSessionPointer = pointerSessionData.reduce((total: any, doc: any) => total + (doc.points || 0), 0);

            result.totalUserPoints = totalUserPointer;
            result.totalSessionPoints = totalSessionPointer

            return next(null, result);
        } catch (err: any) {
            return next(err, "Something went wrong!");
        }
    };

    // get Pointers by userId
    static async getPointersByUserID(userID: any, sessionID: any, next: CallableFunction) {
        try {
                const result = await new CrudOperations(Pointer).getAllDocuments({ userId: userID }, {}, {}, {});
                const totalUserPoints = result.reduce((total: any, doc: any) => total + (doc.points || 0), 0);

                const sessionData = await new CrudOperations(Pointer).getAllDocuments({ sessionId: sessionID }, {}, {}, {});
                const totalSessionPoints = sessionData.reduce((total: any, doc: any) => total + (doc.points || 0), 0);

                const response = {
                    totalUserPoints,
                    totalSessionPoints,
                    result,
                }
                next(null, response);
           
        } catch (err) {
            console.log("Error:", err);
            next("Something went wrong");
        }
    }

}

export default pointerServices;