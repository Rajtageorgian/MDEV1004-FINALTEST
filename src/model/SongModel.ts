import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Song document.
 */
export interface Song extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  releaseDate: string;
  label: string;
  trackNumber: number;
  isExplicit: boolean;
  rating: number;
  composer: string;
  youtubeLink: string;
  images: string[];
}

// Define the song schema
const songSchema: Schema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  duration: String,
  releaseDate: String,
  label: String,
  trackNumber: Number,
  isExplicit: Boolean,
  rating: Number,
  composer: String,
  youtubeLink: String,
  images: [String],
});

// Create and export the song model
export default mongoose.model<Song>('Song', songSchema);
