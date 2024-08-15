import { DataTypes,Model,Optional } from "sequelize";
import sequelize from "../config/database";




interface ScheduleAttributes{
id:number;
recipient:string[]
senderId:string
title:string
content:string
type:string
time:Date
day:Date

}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id'> {}

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes{

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
Schedule.init(
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

export default Schedule;