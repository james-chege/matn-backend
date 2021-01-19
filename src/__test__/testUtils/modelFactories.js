const bcrypt = require('bcrypt');
const { User, Course, StudentCourse, Student } = require('../../../database/models');

const hashedPass = (password) => bcrypt.hashSync(password, 12);

const createCourses = async () => {
    return Course.bulkCreate(
        [
            {
                name: 'Artificial Intelligence',
                description: 'This is some details about this course',
                instructor: 'Mr. foo',
            },
            {
                name: 'Intro to Computers',
                description: 'This is some details about this course',
                instructor: 'Mrs. Bar',
            },
        ],
        {
            returning: true,
        }
    );
};

const createStudents = async () => {
    const students = await Student.bulkCreate(
        [
            {
                name: 'Jane Doe',
                email: 'janedoe@mail.com',
                password: hashedPass('password'),
            },
            {
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: hashedPass('password'),
            },
        ],
        {
            returning: true,
        }
    );
    return students;
};

const createCourse = async (data) => {
    return StudentCourse.create({
        ...data,
    });
};

const createAdmin = async () => {
    const admin = await User.findOne({ where: { email: 'admin@mail.com' }});
    if (admin) {
        return admin
    }
    return User.create({
        name: 'admin',
        email: 'admin@mail.com',
        password: hashedPass('admin'),
    });
};

const dropAll = () => {
    User.destroy({
        where: {},
        truncate: true,
    });
    StudentCourse.destroy({
        where: {},
        truncate: true,
    });
    Student.destroy({
        where: {},
        truncate: true,
    });
};

module.exports = {
    createCourses,
    createStudents,
    createCourse,
    createAdmin,
    dropAll
};
