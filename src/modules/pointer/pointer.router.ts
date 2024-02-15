import { Router } from "express";
import pointerController from "./pointer.controller";

const pointerRouter = Router();

pointerRouter.post("/addPointer", pointerController.addPointer);

pointerRouter.get("/getPointers/:userId/:sessionId/:language", pointerController.getPointersByUserId);



export default pointerRouter;