const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            // required: [true, 'Gimme anyyythinnngg🙃'],
            // minlength: [5, 'Gimme some more🍫'],
        },
        likeUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }, { timestamps: true });

const Idea = mongoose.model('Idea', IdeaSchema);
module.exports = Idea;