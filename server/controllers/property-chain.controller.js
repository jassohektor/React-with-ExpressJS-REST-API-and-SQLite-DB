const model = require("../models/property-chain.model");

exports.getPropertyChains = async (req, res) => {
    try {
        model.PropertyChain.findAll().then((result) => {
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