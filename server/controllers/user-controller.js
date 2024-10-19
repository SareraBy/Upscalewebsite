const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exepctions/api-error');
class UserController {


    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const userData = await userService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 86400000, httpOnly: true}); // 1 день
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 86400000, httpOnly: true}); // 1 день
            return res.json(userData);
        }catch (e) {
            next(e);
        }
    }

    async activates(req, res, next) {
        try {
            const ActivationLink = req.params.link
            await userService.activate(ActivationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(200)  ;

        }catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {

             }catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
            
            res.json(['Start', "awgaw"]);

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();