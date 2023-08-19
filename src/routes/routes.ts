import { Router } from 'express';
import Controller from '../controllers/Controller';
import { register, login } from '../controllers/Auth';
import { authenticateToken } from '../utils/JwtUtils';

const router = Router();
const controller = new Controller();
//user login
router.post('/user_login', login);
//user registeration
router.post('/user_register', register);

// Get all favourite Song
router.get('/get_song',authenticateToken, controller.getAllFavouriteSongs);

// Get favourite song by ID
router.get('/get_song/:id',authenticateToken, controller.getFavouriteSongByID);

// Add a new song
router.post('/add_song',authenticateToken, controller.addFavouriteSong);

// Update an existing song by ID
router.put('/update_song/:id',authenticateToken, controller.updateFavouriteSong);

// Delete an existing song by ID
router.delete('/delete_song/:id',authenticateToken, controller.deleteFavouriteSong);

export default router;
