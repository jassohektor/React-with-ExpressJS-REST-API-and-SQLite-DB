const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../config/database");

const Property = db.context.define("Property", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    propertyChainId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    propertyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zipCode: {
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
    tableName: 'properties',
    indexes: [{
        name: 'idx_property_name_zipcode', unique: false, fields: ["propertyName", "zipCode"]
    }]
});

module.exports = { Property };