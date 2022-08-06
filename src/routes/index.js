
const postRoutes = require("./post.route");


exports.registerRoutes = (app) => {
    app.use("/api/posts", postRoutes);
};