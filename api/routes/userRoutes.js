const router = require("express").Router();
const { updateUser, deleteUser, getUser, getAllUsers, userStats } = require("../controllers/userController.js");
const verify = require("../verifyToken.js");

// Update
router.put("/:id", verify, updateUser);
// Delete
router.delete("/:id", verify, deleteUser);

// Get user
router.get("/find/:id", getUser);

// Get All users
router.get("/", verify, getAllUsers);

// Get User Stats
router.get("/stats", verify, userStats);

module.exports = router;