const bcrypt = require('bcrypt');

const appendTimestamps = (data) => {
    return data.map((item) => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));
};

const getStudents = () => {

    const password = bcrypt.hashSync('password', 12);

    return appendTimestamps([
        {
            name: 'Foo Bar',
            email: 'foobar@mail.com',
            password,
        },
        {
            name: 'Bar Baz',
            email: 'barbaz@mail.com',
            password,
        },
        {
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            password,
        },
        {
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password,
        },
    ]);
};

const getCourses = () =>
    appendTimestamps([
        {
            name: 'Artificial Intelligence',
            description: 'This is some details about this course',
            instructor: 'Mr. foo',
        },
        {
            name: 'Intro to Computers',
            description: 'This is some details about this course',
            instructor: 'Mr. Bar',
        },
        {
            name: 'Chemistry',
            description: 'This is some details about this course',
            instructor: 'Mr. A',
        },
        {
            name: 'Psychology',
            description: 'This is some details about this course',
            instructor: 'Mrs. C',
        },
        {
            name: 'Information Technology',
            description: 'This is some details about this course',
            instructor: 'Mrs. Y',
        },
        {
            name: 'Calculus',
            description: 'This is some details about this course',
            instructor: 'Mrs. Z'
        },
    ]);

const getAdmin = () => {
    const adminPassword = bcrypt.hashSync('admin', 12);
    return appendTimestamps([{
        name: 'admin',
        email: 'admin@mail.com',
        password: adminPassword,
    }])
}

module.exports = {
    getStudents,
    getCourses,
    getAdmin
};
