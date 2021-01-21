const {getCourses} = require('../../../database/__mock__');
const {getStudents} = require('../../../database/__mock__');
const {getAdmin} = require('../../../database/__mock__');
const { User, Course, StudentCourse, Student } = require('../../../database/models');

const createCourses = async () => {
    return Course.bulkCreate(
        getCourses(),
        {
            returning: true,
        }
    );
};

const createStudents = async () => {
    const students = await Student.bulkCreate(
        getStudents(),
        {
            returning: true,
        }
    );
    return students;
};

const createCourse = async (data) => {
    return StudentCourse.create({
        ...data,
    }, {returning: true});
};

const createAdmin = async () => {
    let admin = await User.findOne({ where: { email: 'admin@mail.com' }});
    if (admin) {
        return admin
    }
    admin = await User.create(getAdmin()[0], {returning: true});
    return admin;
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
    Course.destroy({
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
