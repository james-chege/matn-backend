import 'regenerator-runtime/runtime';
import { createStudents } from '../../testUtils/modelFactories';

const { app } = require('../../testUtils/app');
const { createCourses } = require('../../testUtils/modelFactories');

const apiPost = (url, data = {}) => {
    return app.post(url).send(data);
};

describe('get all courses', () => {
    beforeAll(async () => {
        await createCourses();
        await createStudents();
    });

    it('should not allow unauthenticated users', async () => {
        const res = await apiPost('/api/student/addCourse');
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ message: 'Authentication failed!' });
    });

    it('should add course successfully', async () => {
        await app.loginRandom();
        const data = {
            studentId: 1,
            courseId: 2,
        };
        const res = await apiPost(`/api/student/addCourse`, data);
        expect(res.body).toHaveProperty('course');
        expect(res.body.course).toHaveProperty('courseId');
        expect(res.status).toBe(201);
    });
});
