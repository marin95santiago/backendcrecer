const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);

        jwt.verify(onlyToken, process.env.SECRET, (error, decoded) => {
            if(error){
                res.status(404).send({message: 'Token invalid'});
            } else {
                req.user = decoded;
                next();
                return
            }
        });
    } else {
        return res.status(404).send({message: 'Token is not supplied'});
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({message: 'Admin token is not valid'});
}

module.exports = { isAuth, isAdmin }