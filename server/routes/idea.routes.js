const IdeaController = require('../controllers/idea.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/idea', authenticate, IdeaController.createPost);
    app.get('/api/ideas', authenticate, IdeaController.findAllPosts);
    app.get('/api/ideas/user/:id', authenticate, IdeaController.getByUser);
    app.delete('/api/delete/:id', authenticate, IdeaController.deletePost);
    app.get('/api/idea/:id', authenticate, IdeaController.getOneIdea);
    app.get('/api/likepost/:id', authenticate, IdeaController.likePost);
}