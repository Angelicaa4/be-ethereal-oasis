import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const {DataTypes} = Sequelize;

const ModelRoom = db.define('tb_room',{
    id_room: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nama_room: {
        type: DataTypes.STRING,
    },
    desc_room: {
        type: DataTypes.STRING
    },
    gambar: {
        type: DataTypes.STRING
    },
    harga: {
        type: DataTypes.INTEGER(10)
    }
},{
    freezeTableName: true,
})

export default ModelRoom;