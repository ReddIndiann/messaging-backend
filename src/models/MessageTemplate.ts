import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MessageTemplateAttributes {
  id: number;
  title: string;
  content: string;
  messageCategory: string;
  userId: number;
}

interface MessageTemplateCreationAttributes extends Optional<MessageTemplateAttributes, 'id'> {}

class MessageTemplate extends Model<MessageTemplateAttributes, MessageTemplateCreationAttributes> 
  implements MessageTemplateAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public messageCategory!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MessageTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messageCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'message_templates',
  }
);

export default MessageTemplate;
