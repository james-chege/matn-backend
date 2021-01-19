import bcrypt from 'bcrypt';
import { User } from '../../database/models';
import HttpError from '../utils/http-error';
import { generateAuthToken } from '../utils';

export default {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        let existingUser;

        try {
            existingUser = await User.findOne({ where: { email } });
        } catch (err) {
            const error = new HttpError(
                'Logging in failed, please try again later.',
                400
            );
            return next(error);
        }

        if (!existingUser) {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                401
            );
            return next(error);
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(
                password,
                existingUser.password
            );
        } catch (err) {
            const error = new HttpError(
                'Unable to log you in. Please check you credentials and try again.',
                500
            );

            return next(error);
        }

        if (!isValidPassword) {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                401
            );
            return next(error);
        }

        let token;
        try {
            token = await generateAuthToken({
                userId: existingUser.id,
                email: existingUser.email,
            });
        } catch (err) {
            const error = new HttpError(
                'Logging in failed, please try again.',
                500
            );
            return next(error);
        }
        res.json({ userId: existingUser.id, email: existingUser.email, token });
    }
};
