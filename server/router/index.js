const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activates);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers)


module.exports = router;