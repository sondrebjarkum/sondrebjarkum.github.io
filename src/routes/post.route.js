const { Router } = require("express");
const router = Router();
// const checkAuth = require("../middlewares/auth.middleware");

const {
    createSauce,

} = require("../controllers/post");

router.post("/", /*checkAuth,*/ createSauce);
// router.get("/my_posts", checkAuth, fetchMyPosts);


// router.delete("/:postId", checkAuth, deletePost);

// router.patch("/:postId/add_remove_like", checkAuth, addRemoveLike);

module.exports = router;