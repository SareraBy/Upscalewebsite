const UserModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dts");
const ApiError = require("../exepctions/api-error");
class UserService {
    async register(email, password) {

        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь уже существует: ${email}`);
        }


        const hashPassword = await bcrypt.hash(password, 12);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });


        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest("Ссылка не активна")
        }
        user.isActivated = true;
        await user.save()
    }


    async login(email, password){
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Нет такого Email')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Пароль неверный')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }


    async logout(refreshToken){
        const token = tokenService.removeToken(refreshToken);
        return token
    }
}

module.exports = new UserService();
