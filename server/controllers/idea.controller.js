const Idea = require('../models/idea.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY

module.exports.createPost = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Idea.create({ ...req.body, creator: user._id})
    .then(async newIdea => { 
        newIdea = await newIdea.populate('creator', 'nickname')
        res.json({ idea: newIdea })
    })
    .catch((err) => {
        res.status(400).json({ message: 'Something went wrong with create', error: err})
    });
}

module.exports.findAllPosts = (req, res) => {
    Idea.find()
        .populate('creator', 'nickname')
        .then((allPosts) => {
            res.json({ idea: allPosts })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong with find all', error: err})
        });
}

module.exports.getByUser = (req, res) => {
    Idea.find({ creator: req.params.id })
        .then(e => res.json(e))
        .catch(e => res.status(400).json({ message: 'problem finding idea by user', error: e }));
}

module.exports.getOneIdea = (req,res)=>{
    Idea.findById(req.params.id)
    .populate('creator', 'nickname')
    .populate('likeUsers', 'nickname name')
    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
        res.status(400).json(err)
    })
}

module.exports.likePost =(req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Idea.findOneAndUpdate({_id: req.params.id}, {$push: {likeUsers: user._id}}, {new:true})
    .populate('creator', 'nickname')
    .then( e => res.json(e) )
    .catch( e => res.status(400).json( {message: 'problem in like post', error: e } ));
}

module.exports.deletePost = (req, res) => {
    Idea.deleteOne({ _id: req.params.id })
        .then( e => res.json(e) )
        .catch( e => res.status(400).json( {message: 'problem in delete idea', error: e } ));
}
