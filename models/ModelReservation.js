import { Sequelize } from "sequelize";
import db from "../configs/Database.js";
import ModelUser from "./ModelUser.js";

const {DataTypes} = Sequelize;

const ModelReservation = db.define('tb_reservations', {
    id_reservasi: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ModelUser,
            key: 'id_user'
        }
    },
    nama: {
        type: DataTypes.STRING
    },
    check_in: {
        type: DataTypes.DATEONLY
    },
    check_out: {
        type: DataTypes.DATEONLY
    },
    room: {
        type: DataTypes.STRING
    },
    jumlah_room: {
        type: DataTypes.INTEGER
    },
    total_harga: {
        type: DataTypes.STRING
    },
    metode: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

ModelReservation.sync()
    .then(() => {
        console.log('Tabel tb_reservations berhasil dibuat.');
    })
    .catch(error => {
        console.error('Error:', error);
    });

export default ModelReservation;