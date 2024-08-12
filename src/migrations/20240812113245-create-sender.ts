// migrations/XXXXXXXXXXXXXX-create-sender.ts
import { DataTypes } from 'sequelize';
import { Migration } from 'sequelize-cli';

module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable('senders', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable('senders');
  },
};
