const { Op } = require("sequelize");
const model = require("../models/contact.model");


exports.getContacts = async (req, res) => {
    try {
        await model.Contact.findAll()
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

exports.getContact = async (req, res) => {
    try {
        const contact = await model.Contact.findByPk(req.params.id);
        if(!contact){
            return res.status(202).json({ message: `contact not found: ${req.params.id}`});
        }
        else {
            return res.status(200).json(contact);
        }
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

exports.postContact = async (req, res) => {
    try {
        let { propertyId, firstName, lastName, email, active } = req.body;
        if(!propertyId || !firstName || !email) {
                return res.status(202).json({ message: 'Insufficient data provided.'});
        }
        else {
            let contact = model.Contact.build(
            {
                propertyId: propertyId,
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                active: active
            });
                
            await contact.save().then((result) => {
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

exports.putContact = async (req, res) => {
    try {
        const contact = await model.Contact.findOne({where: { id: req.body.id }});
        if (!contact) {
            return res.status(202).json({
                message: `contact not found: ${req.body.id}`,
            });
        }
        contact.propertyId = req.body.propertyId;
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.email = req.body.email;
        contact.active = req.body.active;

        await contact.save().then((result) => {
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

exports.deleteContact = async (req, res) => {
    try {
        const contact = await model.Contact.findByPk(req.params.id);
        if(!contact){
            return res.status(202).json({ message: `Record not found: ${req.params.id}`});
        }
        else {
            await contact.destroy().then((result) => {
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
    }
    catch(err) {
        return res.status(500).send(err);
    }
};