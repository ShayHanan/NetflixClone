const router = require("express").Router();
const { createList, deleteList, getLists, updateList } = require("../controllers/listController.js");
const verify = require("../verifyToken.js");

// Create
router.post("/", verify, createList);

// Delete
router.delete("/:id", verify, deleteList);

// Get lists
router.get("/", verify, getLists);

// Update list
router.put("/:id", verify, updateList);
module.exports = router;