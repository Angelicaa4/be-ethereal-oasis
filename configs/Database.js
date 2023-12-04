import { Sequelize } from "sequelize";


const db = new Sequelize("db_tugas","root","",{
    host: "localhost",
    dialect: "mysql",
})

export default db;