import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path if necessary

interface GroupAttributes {
  id: number;
  groupname: string;
  members: number[]; // Array of member IDs
  userId: number;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public groupname!: string;
  public members!: number[];
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.JSON, // Store array of member IDs as JSON
      allowNull: false,
      defaultValue: [], // Default to empty array
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'groups',
  }
);

export default Group;
