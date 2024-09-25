import express from 'express';
import Track from '../models/Track';
import {TrackWithoutId} from '../types';
import Album from '../models/Album';
import mongoose from 'mongoose';
import auth from '../middleware/auth';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const {album: albumId, artist: artistId} = req.query;
    let tracks = await Track.find();
    if(albumId) {
      tracks = await Track.find({album: albumId}).sort({number: 1});
    }

    if(artistId) {
      const albums = await Album.find({artist: artistId});
      const albumIds = albums.map(album => album._id);
      tracks = await Track.find({ album: { $in: albumIds } });
    }
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const trackData: TrackWithoutId = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      number: req.body.number,
      youtubeLink: req.body.link ? req.body.link : null,
    };

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default tracksRouter;