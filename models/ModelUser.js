import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const {DataTypes} = Sequelize;

const ModelUser = db.define('tb_user',{
    id_user : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    username: {
        type: DataTypes.STRING, 
    },
    password: {
        type: DataTypes.STRING(100)
    },
    token: {
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true,
})

export default ModelUser;