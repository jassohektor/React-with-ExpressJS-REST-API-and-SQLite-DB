const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../config/database");
const createUUID = db.createUUID;
const secretKey = db.secretKey;

const User = db.context.define("User", {
    uuid: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    timestamps: false,
    tableName: 'users',
    indexes: [{ 
        name: 'idx_name_email', unique: false, fields: ["name","email"] 
    }]
});

module.exports = { User, secretKey, createUUID };