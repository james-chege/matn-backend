import 'regenerator-runtime/runtime';
import { createStudents, dropAll } from '../../testUtils/modelFactories';

const { app } = require('../../testUtils/app');
const { createCourses } = require('../../testUtils/modelFactories');

const apiPost = (url, data = {}) => {
    return app.post(url).send(data);
};

describe('get all courses', () => {

    it('should not allow unauthenticated users', async () => {
        const res = await apiPost('/api/student/addCourse');
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ message: 'Authentication failed!' });
    });

    it('should add course successfully', async () => {
        await app.loginRandom();
        const data = {
            courses: [
                {
                    studentId: 1,
                    courseId: 1,
                },
            ],
        };
        const res = await apiPost(`/api/student/addCourse`, data);
        expect(res.body).toHaveProperty('courses');
        expect(res.status).toBe(201);
    });
});
