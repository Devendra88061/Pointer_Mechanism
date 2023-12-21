import { Router } from "express";
import userController from "./user.controller";



const userRouter = Router();

userRouter.post("/addUser", userController.addUser);

userRouter.get("/getAllUsers", userController.getAllUsers);

userRouter.get("/getUser/:id", userController.getSingleUser);

userRouter.put("/updateUser/:id", userController.updateUser);

userRouter.delete("/deleteUser/:id", userController.deleteUser);

export default userRouter;