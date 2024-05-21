const model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
/* HTTP response  status codes:
    200: Ok
    202: Accepted (but processing not completed)
    400: Bad request
    401: Unauthorized
    403: Forbidden (occurs when the user has access but commits not authorized actions)
    500: Server error
*/

exports.postLogin = async (req, res) => {
    try {
        let { email, pwd } = req.body;
        const user = await model.User.findOne({ where: { email: email, pwd: md5(pwd), active: 1 } });

        if(!user) {
            return res.status(202).json({ message: 'Wrong credentials.'});
        }
        else {
            token = jwt.sign({
                uuid: user.uuid,
                email: user.email
            }, model.secretKey, { expiresIn: "12h" });//<--seconds must be number type, "10h", "1d", "3d", 60

            return res.status(200).json({
                    uuid: user.uuid,
                    name: user.name,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdDate: user.createdDate,
                    active: user.active,
                    token: token
                });
        }
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

exports.postUser = async (req, res) => {
    try {
        let { name, email, pwd, photoURL, active } = req.body;

        if(!name || !email || !pwd) {
            return res.status(202).json({ message: 'Insufficient data provided.'});
        }
        else {
            let user = model.User.build(
            {
                uuid: model.createUUID(),
                name: name,
                email: email,
                pwd: md5(pwd),
                photoURL: photoURL,
                active: active
            });
            await user.save().then((result) => {
                token = jwt.sign({ 
                    uuid: user.uuid, 
                    email: user.email 
                }, model.secretKey, { expiresIn: "12h" });
        
                return res.status(200).json({
                    message:'Record created successfully.',
                    entity: result,
                    token: token
                });
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

exports.getUsers = async (req, res) => {
    try {
        await model.User.findAll({attributes: ["uuid", "name", "email", "photoURL", "createdDate", "active"]})
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

exports.putUser = async (req, res) => {
    try {
        const user = await model.User.findOne({where: { uuid: req.body.uuid }});
        if (!user) {
            return res.status(202).json({
                message: `user not found: ${req.body.uuid}`,
            });
        };
        user.name = req.body.name;
        user.email = req.body.email;
        
        if(req.body.pwd) {
            console.log(`password updated for: ${user.name}`);
            user.pwd = md5(req.body.pwd);
        }
        user.photoURL = req.body.photoURL;
        user.active = req.body.active;
        await user.save().then((result) => {
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

exports.deleteUser = async (req, res) => {
    try {
        const user = await model.User.findByPk(req.params.uuid);
        if(!user){
            return res.status(202).json({ message: `Record not found: ${req.params.uuid}`});
        }
        else {
            await user.destroy().then((result) => {
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