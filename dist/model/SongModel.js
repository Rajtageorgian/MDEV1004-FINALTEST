"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the song schema
const songSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Song', songSchema);
