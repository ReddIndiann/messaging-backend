import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path if necessary

interface SenderAttributes {
  id: number;
  name: string;
  userId: number;
  status: string;
}

interface SenderCreationAttributes extends Optional<SenderAttributes, 'id' | 'status'> {} // status is optional

class Sender extends Model<SenderAttributes, SenderCreationAttributes> implements SenderAttributes {
  public id!: number;
  public name!: string;
  public userId!: number;
  public status!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sender.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Default value set to 'pending'
    },
  },
  {
    sequelize,
    tableName: 'senders',
  }
);

export default Sender;
