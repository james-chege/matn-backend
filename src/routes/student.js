import express from 'express';
import { check } from 'express-validator';
import studentController from '../controllers/studentController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate);

router.get('/courses/:id', studentController.courses);
router.get('/', studentController.students);
router.post(
    '/addCourse',
    [check('courses').isArray(), check('courses').isLength({ min: 1 })],
    studentController.addCourse
);

export default router;
