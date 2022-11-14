'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users',  {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      referenceId: {
        type: Sequelize.INTEGER
      },
      userType: {
        type: Sequelize.STRING
      },
      isActive: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      isMicrosoftLinked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      isGoogleLinked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};