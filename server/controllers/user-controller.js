const userService = require('../service/user-service');

class UserController {


    async register(req, res) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const userData = await userService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 86400000, httpOnly: true}); // 1 день
            return res.json(userData);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Registration failed" });
        }
    }

    async login(req, res) {
        try {

        }catch (e) {

        }
    }

    async activates(req, res) {
        try {
            const ActivationLink = req.params.link
            await userService.activate(ActivationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    }

    async logout(req, res) {
        try {

        }catch (e) {

        }
    }

    async refresh(req, res) {
        try {

             }catch (e) {

        }
    }

    async getUsers(req, res) {
        try {
            
            res.json(['Start', "awgaw"]);

        } catch (e) {

        }
    }
}

module.exports = new UserController();