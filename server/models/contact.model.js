const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../config/database");

const Contact = db.context.define("Contact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'contacts',
    indexes: [{ 
        name: 'idx_contacts_email', unique: true, fields: ["email"] 
    }]
});

module.exports = { Contact };