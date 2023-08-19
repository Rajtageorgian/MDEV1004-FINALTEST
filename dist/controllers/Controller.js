"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SongModel_1 = __importDefault(require("../model/SongModel"));
const logger_1 = __importDefault(require("../logger"));
class Controller {
    /**
     * Get all favourite songs.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getAllFavouriteSongs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favouriteSongs = yield SongModel_1.default.find().lean();
                if (favouriteSongs.length === 0) {
                    logger_1.default.info('Favourite Songs not found');
                    res.status(404).json({ message: 'No favourite Songs found' });
                }
                else {
                    res.json(favouriteSongs);
                    logger_1.default.info('Favourite Songs found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getAllFavouriteSongs method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Get a favourite Song by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getFavouriteSongByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const favouriteSong = yield SongModel_1.default.findById(id).lean();
                if (!favouriteSong) {
                    res.status(404).json({ message: 'Song not found' });
                }
                else {
                    res.json(favouriteSong);
                    logger_1.default.info('Favourite Song found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getFavouriteSongByID method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
    * Add a new song.
    *
    * @param req The request object.
    * @param res The response object.
    */
    addFavouriteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, artist, album, genre, duration, releaseDate, label, trackNumber, isExplicit, rating, composer, youtubeLink, images, } = req.body;
            try {
                const newFavouriteSong = new SongModel_1.default({
                    title,
                    artist,
                    album,
                    genre,
                    duration,
                    releaseDate,
                    label,
                    trackNumber,
                    isExplicit,
                    rating,
                    composer,
                    youtubeLink,
                    images,
                });
                yield newFavouriteSong.save();
                res.status(201).json(newFavouriteSong);
                logger_1.default.info('Favourite song added');
            }
            catch (error) {
                logger_1.default.error(`Error found in addFavouriteSong method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Update an existing favourite Song by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    updateFavouriteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedFavouriteSong = yield SongModel_1.default.findByIdAndUpdate(id, updatedData, { new: true }).lean();
                if (!updatedFavouriteSong) {
                    res.status(404).json({ message: 'Song not found' });
                }
                else {
                    res.json(updatedFavouriteSong);
                    logger_1.default.info('Favourite Song updated');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in updateFavouriteSong method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Delete an existing favourite Song by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    deleteFavouriteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedFavouriteSong = yield SongModel_1.default.findByIdAndDelete(id).lean();
                if (!deletedFavouriteSong) {
                    res.status(404).json({ message: 'Song not found' });
                }
                else {
                    res.json({ message: 'Favourite Song deleted successfully' });
                    logger_1.default.info('Favourite Song deleted');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in deleteFavouriteSong method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = Controller;
