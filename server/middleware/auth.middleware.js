const model = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let { authorization } = req.headers;
        const token = authorization && authorization.includes('Bearer ') ? req.headers.authorization.split(' ')[1] : null;//Authorization: 'Bearer token'
        if (!token) {
            return res.status(401).json({
                message: "Token was not provided."
            });
        }

        let decodedJWT = jwt.verify(token, model.secretKey);
        let user = await model.User.findByPk(decodedJWT.uuid); //In case the user got fired and wants revenge while the session keeps alive!
        if (!user.active) {
            return res.status(403).json({
                message: `Forbidden request: ${ JSON.stringify(user) }`
            });
        }
        else {
            next();
        }
    } catch(err) {
        return res.status(401).json({
            message: `Unauthorized request, ${err}`
        });
    }
};