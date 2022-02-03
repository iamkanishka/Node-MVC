const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');

module.exports.usertokencheck = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.find({_id:decoded.id,user_id:decoded.userid}).select('-password');
            next();
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            next(err);
        }
    }
    if (!token) {
        return res.status(401).json({
            message: 'Not Authorized!',
        });
    }
};