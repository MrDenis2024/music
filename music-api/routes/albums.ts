import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Artist from '../models/Artist';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import TrackHistory from '../models/TrackHistory';

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

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
     const album = new Album({
      user: req.user?._id,
      artist: req.body.artist,
      title: req.body.title,
      year: parseFloat(req.body.year),
      image: req.file ? req.file.filename : null,
    });
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if(album === null) {
      return res.status(404).send({error: 'Album not found'});
    }

    const updateAlbum = await Album.findByIdAndUpdate(album._id, {$set: {isPublished: !album.isPublished}}, {new: true});
    return res.send(updateAlbum);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if(album === null) {
      return res.status(404).send({error: 'Album not found'});
    }

    if(req.user?.role === 'admin' || (req.user?.role === 'user' && !album.isPublished && album.user.equals(req.user._id))) {
      await Album.deleteOne({_id: req.params.id});
      const tracks = await Track.find({ album: req.params.id });
      const trackIds = tracks.map(track => track._id);
      await TrackHistory.deleteMany({ track: { $in: trackIds } });
      return res.send({message: 'Album deleted successfully'});
    }

    return res.status(403).send({error: 'You cannot delete this album'});
  } catch (error) {
    return next(error);
  }
});

export default albumsRouter;