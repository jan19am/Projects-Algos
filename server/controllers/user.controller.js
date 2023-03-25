const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Idea = require('../models/idea.model');
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req,res) => {
        try{
            // Create a new User
            const newUser = await User.create(req.body)
            console.log(newUser)
            // Create a JWT using our Secret Key
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email}, SECRET)

            // Send the JWT back to the user as a cookie
            res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({successMessage: 'User logged in', user:newUser})
        }catch(error){
            res.status(400).json(error)
        }
    },

    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        console.log('logging in:' + user)
        try {
            // if email not in system
            if (!user) {
                res.status(400).json({ errors: 'Invalid email/password' })
                console.log('error')
                // else check the rest
            } else {
                console.log('error1')
                const validPassword = await bcrypt.compare(req.body.password, user.password)
                if (!validPassword) {
                    res.status(400).json({ errors: 'Invalid email/password' })
                } else {
                    console.log('error2')
                    const payload = { _id: user._id, email: user.email, name: user.name }
                    const token = jwt.sign(payload, SECRET)
                    res.cookie('userToken', token, { expires: new Date(Date.now() + 900000) })
                    .json({ successMessage: 'userToken: ', user: payload })
                }
            }
        } catch (err) {
            res.status(400).json({ errors: 'oops something when wrong in login' })
        }
    },
    getLogged: async (req, res) => {
        try {
            const user = jwt.verify(req.cookies.userToken, SECRET);
            const currentUser = await User.findOne({ _id: user._id });
            res.json(currentUser);
        } catch (error) {
            res.status(400).json({ errors: 'failed to get logged in user' })
        }
    },
    getUser: async (req, res) => {
        try {
            const currentUser = await User.findOne({ _id: req.params.id });
            res.json(currentUser);
        } catch (error) {
            res.status(400).json({ errors: 'failed to get user' })
        }
    },
    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({success: 'User Logged Out'})
    }
}