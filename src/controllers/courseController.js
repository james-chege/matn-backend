import HttpError from "../utils/http-error";
import { Course } from "../../database/models";

export default {
    courses: async (req, res, next) => {
        try {
            const courses = await Course.findAll({});
            return res.json({ courses });
        } catch (e) {
            return next(new HttpError(e.message || "Something went wrong.", 500));
        }
    },
    course: async (req, res, next) => {
        const { id } = req.params;
        try {
            const course = await Course.findOne({ where: { id } });
            return res.json({ course });
        } catch (e) {
            return next(new HttpError(e.message || "Something went wrong.", 500));
        }
    },
};
