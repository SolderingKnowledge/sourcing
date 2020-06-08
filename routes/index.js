const express = require("express");
const router = express.Router();

const todos=["first", "second", "third", "five"];

router.get("/", async (req, res, next)=>{
    console.log("clicked here")
    res.json({todos});
});

module.exports = router;
