const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../config/database");

const Location = db.context.define("Location", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    locationName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
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
    tableName: 'locations'
});

module.exports = { Location };