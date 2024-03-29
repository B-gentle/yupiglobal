const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @DESC Auth user and get token
// @routes POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error("Invalid login details")
    }
})

// @DESC Register user
// @routes POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
})

// @DESC Logout user
// @routes POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        message: 'Logged out successfully'
    })
});

// @DESC Get user Profile
// @routes GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})

// @DESC update user Profile
// @routes PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("User nof found")
    }
})

// @DESC Get Users
// @routes GET /api/users/
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const totalUsers = await User.countDocuments();
    const users = await User.find({}).limit(pageSize).skip(pageSize * (page - 1));
    res.status(200).json({users, page, pages: Math.ceil(totalUsers / pageSize )});
})

// @DESC Get Users by ID
// @routes GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})

// @DESC Delete Users
// @routes DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Cannot Delete Admin User")
        }
        await user.deleteOne({
            _id: user._id
        })
        res.status(200).json({
            message: 'User Deleted Successfully'
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @DESC Update Users
// @routes PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save();
        if (updatedUser) {
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            })
        } else {
            res.status(500)
            throw new Error("failed to update")
        }
    } else {
        res.status(404);
        throw new Error("User not Found");
    }
})

module.exports = {
    loginUser,
    registerUser,
    updateUser,
    updateUserProfile,
    deleteUser,
    logoutUser,
    getUserProfile,
    getUserById,
    getUsers
}