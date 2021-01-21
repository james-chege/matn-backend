import 'regenerator-runtime/runtime';
import { createAdmin } from '../../testUtils/modelFactories';

const { app } = require('../../testUtils/app');

const apiPost = (url, param = '', data = {}) => {
    const newUrl = `${url}${param ? `/${param}` : ''}`;
    return app.post(newUrl).send(data);
};

describe('get all courses', () => {

    it('should fail if logins are not provided', async () => {
        const res = await apiPost('/api/user/login', '', {});
        expect(res.body).toMatchObject({
            message: 'Logging in failed, please try again later.',
        });
        expect(res.status).toBe(400);
    });

    it('should fail if logins email not found', async () => {
        const res = await apiPost('/api/user/login', '', {
            email: 'unavailable@mail.com',
        });
        expect(res.body).toMatchObject({
            message: 'Invalid credentials, could not log you in.',
        });
        expect(res.status).toBe(401);
    });

    it('should fail if password not provided', async () => {
        const res = await apiPost('/api/user/login', '', {
            email: 'admin@mail.com',
        });
        expect(res.body).toMatchObject({
            message: "Unable to log you in. Please check you credentials and try again.",
        });
        expect(res.status).toBe(500);
    });

    it('should fail if logins are wrong', async () => {
        const res = await apiPost('/api/user/login', '', {
            email: 'admin@mail.com',
            password: 'wrongpassword',
        });
        expect(res.body).toMatchObject({
            message: 'Invalid credentials, could not log you in.',
        });
        expect(res.status).toBe(401);
    });

    it('should login user successfully', async () => {
        const res = await apiPost('/api/user/login', '', {
            email: 'admin@mail.com',
            password: 'admin',
        });
        expect(res.body).toHaveProperty('token');
        expect(res.status).toBe(200);
    });
});
