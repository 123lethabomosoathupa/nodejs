const router = require("express").Router(),
    apiRoutes = require("./apiRoutes"),
    userRoutes = require("./userRoutes"),
    subscriberRoutes = require("./subscriberRoutes"),
    courseRoutes = require("./courseRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes");
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
router.use
    ("/api", apiRoutes);
module.exports = router;