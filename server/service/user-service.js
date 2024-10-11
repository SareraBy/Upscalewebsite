const UserModel = require("./models/user-model");

class UserService {
    async register(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`Пользовватель уже сущесвтует: ${candidate}`);
        }
        const user = await UserModel.create({email, password});
    }


}

module.exports = UserService;