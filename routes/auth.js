const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.patch("/update", authController.addToProfile);

router.get("/getProfile/:id", authController.getProfile);

module.exports = router;
