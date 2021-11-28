const jwt  = require('jsonwebtoken');

let authenticate = async (request , response , next) => {
    let token = request.header('x-auth-token');
    console.log(token);
    if(!token){
        throw new Error('No Token Provided , Authentication Denied');
    }
    try {
        let decoded = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        request.user = decoded.user;
        next();
    }
    catch (error) {
       console.error(error);
       throw new Error('Invalid Token , Authentication Denied');
    }
};
module.exports = authenticate;
