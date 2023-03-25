const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.login);
    app.get('/api/user', authenticate, UserController.getLogged);
    app.get('/api/user/:id', authenticate, UserController.getUser);
    app.get('/api/logout', UserController.logOutUser);
}