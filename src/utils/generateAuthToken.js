import jwt from 'jsonwebtoken';

/**
 * Generates jwt token according to the user details provided
 *
 * @param user
 * @returns {*}
 */
const generateAuthToken = async (user) => {
    const { email, userId } = user;
    return jwt.sign(
        {
            email,
            userId
        },
        process.env.JWT_SECRET_KEY || '$3cr3TEAk3y'
    );
};

module.exports = generateAuthToken;
