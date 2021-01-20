
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentCourse.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
        onDelete: 'CASCADE',
      })
    }
  }

  StudentCourse.init({
    studentId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentCourse',
  });

  StudentCourse.addHook('beforeBulkCreate', (stc, options) => {
    stc.forEach(model => {
      model.uuid = model.studentId + '' + model.courseId
    })
  });

  return StudentCourse;
};
