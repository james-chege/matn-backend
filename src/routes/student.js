import express from 'express';
import { check } from 'express-validator';
import studentController from '../controllers/studentController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate);

router.get('/courses/:id', studentController.courses);
router.post(
    '/addCourse',
    [check('studentId').exists(), check('courseId').exists()],
    studentController.addCourse
);

export default router;
