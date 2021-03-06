import { validationResult } from 'express-validator';
import { Course, StudentCourse, Student } from '../../database/models';
import HttpError from '../utils/http-error';

export default {
    courses: async (req, res, next) => {
        const { id } = req.params;

        console.log('😁😁😁😁😁', id)

        try {
            const courses = await StudentCourse.findAll({
                where: { studentId: Number(id) },
                include: [
                    {
                        model: Course,
                        as: 'course',
                    },
                ],
            });
            res.json({ courses });
        } catch (e) {
            const error = new HttpError(
                e.message || 'Could not get courses.',
                500
            );
            return next(error);
        }
    },
    addCourse: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                new HttpError(
                    'Invalid inputs passed, please check your data.',
                    422
                )
            );
        }

        try {
            const courses = await StudentCourse.bulkCreate(req.body.courses, {
                ignoreDuplicates: true
            });

            return res.status(201).json({
                courses,
                message: 'Course(s) added successfully.',
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    students: async (req, res, next) => {
        try {
            const students = await Student.findAll({
                attributes: { exclude: ['password'] },
            });
            res.json({ students });
        } catch (e) {
            const error = new HttpError(
                e.message || 'Could not get students.',
                500
            );
            return next(error);
        }
    },
};
