import { Router } from "express";
import pointerRouter from "./pointer/pointer.router";
import lessonRouter from "./lesson/lesson.router";

const router = Router();

router.use("/pointer", pointerRouter);

router.use("/lesson", lessonRouter);

export default router;