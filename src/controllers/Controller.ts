import { Request, Response } from 'express';
import  Song, { Song as SongInterface } from '../model/SongModel';
import logger from '../logger';

class Controller {
  /**
   * Get all favourite songs.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getAllFavouriteSongs(req: Request, res: Response): Promise<void> {
    try {
      const favouriteSongs = await Song.find().lean();
      if (favouriteSongs.length === 0) {
        logger.info('Favourite Songs not found');
        res.status(404).json({ message: 'No favourite Songs found' });
      } else {
        res.json(favouriteSongs);
        logger.info('Favourite Songs found');
      }
    } catch (error) {
      logger.error(`Error found in getAllFavouriteSongs method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a favourite Song by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getFavouriteSongByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const favouriteSong = await Song.findById(id).lean();
      if (!favouriteSong) {
        res.status(404).json({ message: 'Song not found' });
      } else {
        res.json(favouriteSong);
        logger.info('Favourite Song found');
      }
    } catch (error) {
      logger.error(`Error found in getFavouriteSongByID method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

   /**
   * Add a new song.
   * 
   * @param req The request object.
   * @param res The response object.
   */
   public async addFavouriteSong(req: Request, res: Response): Promise<void> { // Updated method name
    const {
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
    } = req.body;
    try {
      const newFavouriteSong: SongInterface = new Song({
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
      await newFavouriteSong.save();
      res.status(201).json(newFavouriteSong);
      logger.info('Favourite song added');
    } catch (error) {
      logger.error(`Error found in addFavouriteSong method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update an existing favourite Song by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async updateFavouriteSong(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedFavouriteSong = await Song.findByIdAndUpdate(id, updatedData, { new: true }).lean();
      if (!updatedFavouriteSong) {
        res.status(404).json({ message: 'Song not found' });
      } else {
        res.json(updatedFavouriteSong);
        logger.info('Favourite Song updated');
      }
    } catch (error) {
      logger.error(`Error found in updateFavouriteSong method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete an existing favourite Song by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async deleteFavouriteSong(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedFavouriteSong = await Song.findByIdAndDelete(id).lean();
      if (!deletedFavouriteSong) {
        res.status(404).json({ message: 'Song not found' });
      } else {
        res.json({ message: 'Favourite Song deleted successfully' });
        logger.info('Favourite Song deleted');
      }
    } catch (error) {
      logger.error(`Error found in deleteFavouriteSong method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default Controller;
