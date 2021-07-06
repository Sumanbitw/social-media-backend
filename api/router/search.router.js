const express = require("express");
const router = express.Router();
// const verify = require("../middlewares/verifyToken");
const User = require("../model/user.model");

router.get("/:text", async (req, res) => {
  try {
    const {text} = req.params;
    const { userId } = req;

    if (text.length === 0) res.status(400).json([]);

    let user = new RegExp(`^${text}`);

    const results = await User.find({
      name: { $regex: user, $options: "i" }
    });

    const updatedResults =
      results.length > 0 && results.filter(result => result._id.toString() !== userId);

    return res.status(200).json(updatedResults.length > 0 ? updatedResults : results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
