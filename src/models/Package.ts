import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path if necessary

interface PackageAttributes {
  id: number;
  packagename: string;
  description: string;
  price: number;
  unitmessages: number;
  duration: number; // Duration in days
  packageexpiry: boolean; // True or False
}

interface PackageCreationAttributes extends Optional<PackageAttributes, 'id'> {}

class Package extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public id!: number;
  public packagename!: string;
  public description!: string;
  public price!: number;
  public unitmessages!: number;
  public duration!: number;
  public packageexpiry!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    packagename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitmessages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default value; used if packageexpiry is false
    },
    packageexpiry: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'packages',
  }
);

export default Package;
