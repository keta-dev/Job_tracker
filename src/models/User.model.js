import { DataTypes, Sequelize, Model } from 'sequelize';

export class UserModel extends Model {
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { sequelize },
  );
  }

  /**
   * @static
   */
  static associate() {
    UserModel.hasMany(ApplicationModel, { foreignKey: 'userId', as: 'applications' });
  }
}