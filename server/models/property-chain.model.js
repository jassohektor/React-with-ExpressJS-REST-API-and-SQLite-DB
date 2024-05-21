const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../config/database");

const PropertyChain = db.context.define("PropertyChain", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    propertyChainName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
    tableName: 'propertyChains'
});

module.exports = { PropertyChain };