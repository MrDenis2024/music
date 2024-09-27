import express from 'express';
import Track from '../models/Track';
import Album from '../models/Album';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import TrackHistory from '../models/TrackHistory';

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

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const track = new Track({
      user: req.user?._id,
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      number: req.body.number,
      youtubeLink: req.body.link ? req.body.link : null,
    });
    await track.save();

    return res.send(track);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if(track === null) {
      return res.status(404).send({error: 'Track not found'});
    }

    const updateTrack = await Track.findByIdAndUpdate(track._id, {$set: {isPublished: !track.isPublished}}, {new: true});

    return res.send(updateTrack);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if(track === null) {
      return res.status(404).send({error: 'Track not found'});
    }

    if (req.user?.role === 'admin' || (req.user?.role === 'user' && !track.isPublished && track.user.equals(req.user._id))) {
      await Track.deleteOne({ _id: req.params.id });
      await TrackHistory.deleteMany({track: req.params.id});
      return res.send({ message: 'Track deleted successfully' });
    }

    return res.status(403).send({ error: 'You cannot delete this track' });
  } catch (error) {
    return next(error);
  }
});

export default tracksRouter;