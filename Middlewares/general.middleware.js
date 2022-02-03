const jwt = require('jsonwebtoken');


module.exports.apptokencheck = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('appId')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

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