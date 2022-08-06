const simpleGit = require("simple-git");
const git = simpleGit.default();


exports.createSauce = async (req, res, next) => {
    console.log("Create sauce controller fired...")
    console.log(req.body)

    const sauceData = {}

    res.status(200).json({
        type: "success",
        message: "Post created successfully",
        data: {
        // post,
        },
    });
}