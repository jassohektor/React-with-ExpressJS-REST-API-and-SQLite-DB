//const db = require("../config/database");
const { Op } = require("sequelize");
const model = require("../models/property.model");

exports.getProperties = async (req, res) => {
    try {
        model.Property.findAll({
            attributes: ["id", "propertyChainId", "locationId", "propertyName", "address", "zipCode", "createdDate", "active"],
            where: { propertyName: { [Op.like]: `%${ req.params.searchText }%` }  }
        })
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(400).json({
                message: `Unable to fetch records! ${ error }`,
            });
        });
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

exports.postProperty = async (req, res) => {
    try {
        let { propertyChainId, locationId, propertyName, address, zipCode, active } = req.body;
        if(!propertyChainId || !locationId || !propertyName) {
            return res.status(202).json({ message: 'Insufficient data provided.'});
        }
        else {
            let property = model.Property.build(
            { 
                propertyChainId: propertyChainId,
                locationId: locationId,
                propertyName: propertyName, 
                address: address, 
                zipCode: zipCode, 
                active: active
            });
                
            await property.save().then((result) => {
                return res.status(200).json(result);
            })
            .catch((error) => {
                return res.status(400).json({
                    message: `Unable to save record! ${ error }`,
                });
            });
        }
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

exports.putProperty = async (req, res) => {
    try {
        model.Property.update({
            propertyChainId: req.body.propertyChainId,
            locationId: req.body.locationId,
            propertyName: req.body.propertyName,
            address: req.body.address,
            zipCode: req.body.zipCode,
            active: req.body.active
        },
        {
            where: { id: req.body.id },
            returning: true
        })
        .then((result) => {
            return res.status(200).json({
                message:'Record updated successfully.',
                entity: result
            });
        }).catch((error) => {
            return res.status(400).json({
                message: `Unable to update record! ${ error }`,
            });
        });
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        model.Property.destroy({
            where: { id: req.params.id }
        })
        .then((result) => {
            return res.status(200).json({
                message: 'Record deleted successfully.',
                entity: `${ JSON.stringify(result) }`
            });
        })
        .catch((error) => {
            return res.status(400).json({
                message: `Unable to delete record! ${ error }`,
            });
        });
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

/*  //In case you want to play around directly with the database, this is not appropriate and is a really bad practice but who knows, you may need it for something tricky!
    var sql = `SELECT p.propertyName, l.locationName, l.description, c.propertyChainName
        FROM properties p
        JOIN locations l ON p.locationId = l.id
        JOIN propertyChains c ON p.propertyChainId = c.id
        WHERE p.propertyName LIKE '%${req.params.searchText}%'
        AND p.active = 1`;
    
        //var params = [req.params.searchText]
        db.all(sql, [], (err, row) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message":"success",
                "data":row
            });
        });
*/