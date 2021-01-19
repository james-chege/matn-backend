import express from "express";
import course from "../controllers/courseController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.use(authenticate);

router.get(
    '/getCourses',
    course.courses
);

router.get(
    '/getCourse/:id',
    course.course
);

export default router;
