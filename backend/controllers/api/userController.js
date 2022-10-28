const jwt = require('jsonwebtoken'); // Import JWT
const User = require('../../models/userModel'); // Import User
const bcrypt = require('bcryptjs');
// Route for create user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        // Remove password from output
        newUser.password = undefined;

        console.log("newUser", newUser);

        // Create token
        const token = await jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRATION_DATE}
        )

        // Send JSON response
        res.status(201).json({
            status: 'success',
            data: {
                newUser,
                token,
            },
        })
    } catch (error) {
        console.log("userController.js error:", error);
        res.status(500).json({
            status: 'Error',
            error: error,
        })
    }
}

// Route for getting a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Assuming no user found
        if(!user) {
            throw new Error('No user found with that id!');
        }

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
}

// Route for logging in user
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body; // destructuring

        if(!email || !password) {throw new Error("Email and password are both required")};

        // Find user by email address
        const user = await User.findOne({email}).select("+password");

        // Throw error if user not found
        if(!user || !await bcrypt.compare(req.body.password, user.password)) throw new Error();

        // Check passwords if they match
        // const match = await bcrypt.compare(req.body.password, user.password);

        // Throw error if match not found
        // if(!match) throw new Error();
        const newUser = ({
            name: user.name,
            email: user.email
        })

        // Create token
        const token = await jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRATION_DATE}
        )

        // Send JSON response
        res.status(201).json({
            status: 'success',
            data: {
                newUser,
                token,
            },
        })
    } catch (error) {
        console.log("userController.js error:", error);
        res.status(400).json({
            msg: error.message,
            reason: "Bad credentials",
        })
    }
}

// Helper functions
// createJWT = (user) => {
//     return jwt.sign(
//         // Data payload
//         {user},
//         process.env.JWT_SECRET_KEY,
//         {expiresIn: process.env.JWT_EXPIRATION_DATE}
//     )
// }