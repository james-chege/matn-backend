import { validationResult, body } from 'express-validator';
import { Course, StudentCourse } from "../../database/models";
import HttpError from "../utils/http-error";

export default {
    courses: async (req, res, next) => {
        const { id } = req.params;

        try {
            const courses = await StudentCourse.findAll({
                where: { studentId: Number(id) },
                include: [
                    {
                        model: Course,
                        as: "course",
                    }
                ],
            });
            res.json({ courses });
        } catch (e) {
            const error = new HttpError(e.message || "Could not get courses.", 500);
            return next(error);
        }

    },
    addCourse: async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {
            return next(
                new HttpError(
                    "Invalid inputs passed, please check your data.",
                    422
                )
            );
        }

        try {
            const course = await StudentCourse.create({
                ...req.body,
                createdBy: req.userData.userId,
            });

            return res.status(201).json({
                course,
                message: "Course added successfully.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};
