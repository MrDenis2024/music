import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import {AlbumWithoutId} from '../types';
import Track from '../models/Track';
import Artist from '../models/Artist';
import auth from '../middleware/auth';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const albums = await Album.find(artistId ? ({artist: artistId}) : ({})).sort({year: -1});

    if(artistId) {
      const artist = await Artist.findById(artistId);
      if(!artist) {
        return res.status(400).send({error: 'Artist not found'});
      }

      const countTrack = await Promise.all(albums.map(async (album) => {
        const trackCount = await Track.countDocuments({album: album._id});
        return {
          ...album.toObject(),
          tracks: trackCount,
        }
      }));

      const response = {
        artist,
        albums: countTrack,
      };

      return res.send(response);
    }

    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumWithoutId = {
      artist: req.body.artist,
      title: req.body.title,
      year: parseFloat(req.body.year),
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    return res.send(album);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name information image');

    if(album === null) {
      return res.status(404).send({error: 'Album not found'});
    }

    const tracks = await Track.find({album: req.params.id}).sort({number: 1});

    const result = {
      album,
      tracks,
    }

    return res.send(result);
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;