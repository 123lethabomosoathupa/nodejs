const router = require("express").Router(),
    errorController = require("../controllers/errorController"); // Add ../

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;