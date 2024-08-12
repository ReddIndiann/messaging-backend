import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path if necessary

interface ApiKeyAttributes {
  id: number;
  key: string;
  userId: number;
}

interface ApiKeyCreationAttributes extends Optional<ApiKeyAttributes, 'id'> {}

class ApiKey extends Model<ApiKeyAttributes, ApiKeyCreationAttributes> implements ApiKeyAttributes {
  public id!: number;
  public key!: string;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApiKey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that API keys are unique
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'apikeys',
  }
);

export default ApiKey;
