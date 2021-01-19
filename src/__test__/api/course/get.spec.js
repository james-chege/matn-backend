import "core-js/stable";
import "regenerator-runtime/runtime";

const { app } = require('../../testUtils/app');
const { createCourses } = require('../../testUtils/modelFactories');

const apiGet = (url, param = '') => {
    return app.get(`${url}${param ? `/${param}` : ''}`).send();
};


describe('get all courses', () => {
    beforeAll(async () => {
        await createCourses();
    });

    it('should not allow unauthenticated users', async () => {
        const res = await apiGet('/api/course/getCourses');
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ message: 'Authentication failed!' });
    });

    it('should only allow authorized users', async () => {
        await app.loginRandom();
        const res = await apiGet('/api/course/getCourses')
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('courses');
    });

    it('should only allow authorized users', async () => {
        await app.loginRandom();
        const res = await apiGet('/api/course/getCourses')
        expect(res.status).toBe(200);
    });

    it('should get single course', async () => {
        await app.loginRandom();
        const res = await apiGet('/api/course/getCourse', 1)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('course');
    });

    it('should throw error if course id is malformed', async () => {
        await app.loginRandom();
        const res = await apiGet('/api/course/getCourse', 'ze');
        expect(res.status).toBe(500);
    });

});
