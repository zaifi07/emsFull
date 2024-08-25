const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                // console.log(err);
                return res.status(410).json({
                    success: false,
                    message: 'Not author'
                })
            }
            else {
                req.body.userID = decode.id;
                next();
            }
        })
    } catch (error) {
        // console.log(error);
        res.status(303).send({
            success: false,
            message: 'error in jwt'
        })
    }
}