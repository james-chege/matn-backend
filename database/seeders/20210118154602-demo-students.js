

const { getStudents, getCourses, getAdmin } = require('../__mock__');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // seed students
    await queryInterface.bulkInsert('Students', getStudents());
    // seed courses
    await queryInterface.bulkInsert('Courses', getCourses());
    await queryInterface.bulkInsert('Users', getAdmin());
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
    await queryInterface.bulkDelete('Students', null, {});
  }
};
