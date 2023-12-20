const express = require("express");
const router = express.Router()
const { loginUser, registerUser, updateUser, updateUserProfile, deleteUser, logoutUser, getUserProfile, getUserById, getUsers } = require("../controller/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/profile', protect, updateUserProfile);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);

module.exports = router
