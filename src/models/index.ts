import sequelize from '../config/database';// Adjust the path as necessary
import User from './User'; // Adjust the path as necessary
import Sender from './Sender'; // Adjust the path as necessary
import MessageTemplate from './MessageTemplate'; 
import ApiKey from './ApiKey';
import Group from './Group';
import Contact from './Contact';




User.hasMany(Sender, { foreignKey: 'userId', as: 'senders' });
Sender.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(MessageTemplate, { foreignKey: 'userId', as: 'messageTemplates' });
MessageTemplate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(ApiKey, { foreignKey: 'userId', as: 'Apikey' });
ApiKey.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Group, { foreignKey: 'userId', as: 'group' });
Group.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Contact, { foreignKey: 'userId', as: 'contact' });
Contact.belongsTo(User, { foreignKey: 'userId', as: 'user' });



// Export models and sequelize instance
export {
  sequelize,
  User,
  Sender,
 MessageTemplate,
 ApiKey,
 Group,
 Contact,
};
