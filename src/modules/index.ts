import { Router } from "express";
import pointerRouter from "./pointer/pointer.router";

const router = Router();

router.use("/pointer", pointerRouter);

export default router;