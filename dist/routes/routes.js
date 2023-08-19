"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controllers/Controller"));
const Auth_1 = require("../controllers/Auth");
const JwtUtils_1 = require("../utils/JwtUtils");
const router = (0, express_1.Router)();
const controller = new Controller_1.default();
//user login
router.post('/user_login', Auth_1.login);
//user registeration
router.post('/user_register', Auth_1.register);
// Get all favourite Song
router.get('/get_song', JwtUtils_1.authenticateToken, controller.getAllFavouriteSongs);
// Get favourite song by ID
router.get('/get_song/:id', JwtUtils_1.authenticateToken, controller.getFavouriteSongByID);
// Add a new song
router.post('/add_song', JwtUtils_1.authenticateToken, controller.addFavouriteSong);
// Update an existing song by ID
router.put('/update_song/:id', JwtUtils_1.authenticateToken, controller.updateFavouriteSong);
// Delete an existing song by ID
router.delete('/delete_song/:id', JwtUtils_1.authenticateToken, controller.deleteFavouriteSong);
exports.default = router;
