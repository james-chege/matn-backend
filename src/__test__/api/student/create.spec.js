import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createStudents } from '../../testUtils/modelFactories';

const { app } = require('../../testUtils/app');
const { createCourses } = require('../../testUtils/modelFactories');

const studentCourse = {
    studentId: 1,
    courseId: 2,
};

const apiPost = (url, param = '', data) => {
    return app.post(`${url}${param ? `/${param}` : ''}`).send(data);
};

describe('get all courses', () => {
    beforeAll(async () => {
        await createStudents();
        await createCourses();
    });

    it('should not allow unauthenticated users', async () => {
        const res = await apiPost('/api/student/addCourse');
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ message: 'Authentication failed!' });
    });

    it('should add course while authorized', async () => {
        await app.loginRandom();
        const res = await apiPost('/api/student/addCourse', '', {
            ...studentCourse,
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('course');
    });

    it('should fail if student course details are not provided', async () => {
        await app.loginRandom();
        const res = await apiPost('/api/student/addCourse', '', {});
        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
            message: 'Invalid inputs passed, please check your data.',
        });
    });
});
