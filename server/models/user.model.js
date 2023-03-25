const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    nickname: {
        type: String,
        required: [true, "Nickname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
}, {timestamps: true});

// connect with form; create a field called confirmPassword
UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

// This is Mongoose Middleware
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', async function(next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed Password:', hashedPassword)
        this.password = hashedPassword
        next()
    }catch{
        console.log('Error in Save', error)
    }
});


module.exports = mongoose.model('User', UserSchema)
