import "regenerator-runtime/runtime";
import { createStudents, dropAll } from "../../testUtils/modelFactories";

const { app } = require('../../testUtils/app');
const { createCourses } = require('../../testUtils/modelFactories');

const apiGet = (url, param = '') => {
  const newUrl = `${url}${param ? `/${param}` : ''}`;
  return app.get(newUrl).send();
};


describe('get all courses', () => {

  it('should not allow unauthenticated users', async () => {
    const res = await apiGet('/api/student/courses/1');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ message: 'Authentication failed!' });
  });

  it('should show courses for a student', async () => {
    await app.loginRandom();
    const res = await apiGet('/api/student/courses', 1)
    expect(res.body).toHaveProperty('courses');
    expect(res.status).toBe(200);
  });

  it('should handle query error', async () => {
    await app.loginRandom();
    const res = await apiGet('/api/student/courses', 'eeae')
    expect(res.status).toBe(500);
  });

  it('should get a list of all students', async () => {
    await app.loginRandom();
    const res = await apiGet('/api/student');
    expect(res.body).toHaveProperty('students');
    expect(res.status).toBe(200);
  });
});
