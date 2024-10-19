const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-models");

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWTR, {expiresIn: '30d'});

        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({ _id: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({userId, refreshToken});
        return token;
    }


    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }
}


module.exports = new TokenService;