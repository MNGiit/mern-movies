const mongoose = require('mongoose'); // Import mongoose to create user model
const bcrypt = require('bcryptjs'); // Import bcrypt

// Use mongoose to create userSchema
const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: [true, "User must have a name."]},
        email: {type: String, trim: true, unique: true, lowercase: true, required: [true, 'Email is required.']},
        password: {type: String, trim: true, minLength: [3, 'Password must be at least 3 characters'], required: [true, 'Password is required'], select: false},
    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    }
)

// Create document middleware  to encrypt password
userSchema.pre('save', async (next) => {
    if(!this.isModified('password')){
        // Continue
        next();
        // Return early
        return;
    }
    // Encrypt password
    this.password = await bcrypt.hash(this.password, 12)
    // Call next middelware in the stack
    next();
})

// Use mongoose and schema to create user model
const User = mongoose.model('User', userSchema);

// Export model to be used in others parts of application
module.exports = User;