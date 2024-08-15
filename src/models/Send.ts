import { DataTypes,Model,Optional } from "sequelize";
import sequelize from "../config/database";




interface SendAttributes{
id:number;
recipient:string[]
senderId:string
title:string
content:string
type:string
time:Date
day:Date

}

interface SendCreationAttributes extends Optional<SendAttributes, 'id'> {}

class Send extends Model<SendAttributes, SendCreationAttributes> implements SendAttributes{

    public id!:number;
    public recipient!:string[]
    public senderId!:string
    public title!:string
    public content!:string
    public type!:string
    public time!:Date
    public day!:Date


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
}
Send.init(
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,

    },
    recipient:{
        type:DataTypes.JSON,
        allowNull:false
    },
    senderId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    title:{
        type :DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false

    },type:{
        type:DataTypes.STRING,
        allowNull:false
    },time:{
        type: DataTypes.TIME,
        allowNull:false 
    },
    day:{
        type: DataTypes.DATE,
        allowNull:false
    }
    

},
{
sequelize,
tableName:'group'
}
)

export default Send;