import { DataTypes, Model } from 'sequelize';

export class ApplicationModel extends Model {
  /**
   * @type {Sequelize}
   * @static
   */
  static init(sequelize) {
    super.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salaryRange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Applied' // Stage validation can be managed via Express
        },
        jobUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        },
        { sequelize },
    );
  }

  /**
   * @static
   */
  static associate() {
    ApplicationModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  }
}