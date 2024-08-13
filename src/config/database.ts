import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('messaging_api', 'root', 'developer123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log // Disable SQL logging if desired
});

export default sequelize;
