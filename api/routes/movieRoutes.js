const router = require("express").Router();
const { createMovie, updateMovie, deleteMovie, getMovie, randomMovie, getAllMovies } = require("../controllers/movieController.js");
const verify = require("../verifyToken.js");

// Create
router.post("/", verify, createMovie);

// Update
router.put("/:id", verify, updateMovie);

// Delete
router.delete("/:id", verify, deleteMovie);

// Get
router.get("/find/:id", verify, getMovie);

// Get random
router.get("/random", verify, randomMovie);

// Get all movies
router.get("/", verify, getAllMovies);
module.exports = router;