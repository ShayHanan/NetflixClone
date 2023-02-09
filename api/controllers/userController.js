const User = require("../models/User");
const CryptoJS = require("crypto-js");

// update user
const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        // check if the user is changing their password
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("you can update only your account");
    }
};


// delete user
const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("you can delete only your account");
    }
};

// get user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get all users
const getAllUsers = async (req, res) => {
    const query = req.query.new;
    if (req.user?.isAdmin) {
        try {
            // if "new" query is true get the newest 5 users 
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403);
    }
};

// get stats
const userStats = async (req, res) => {
    const today = new Date();
    try {
        const data = await User.aggregate([
            {
                // Project the month of the user's "createdAt" date
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                // Group the data by the month, summing up the total number of users created in each month
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(data);

    } catch (error) {
        res.status(500);
    }
};


module.exports = { updateUser, deleteUser, getUser, getAllUsers, userStats };