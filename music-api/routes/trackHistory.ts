import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import Album from '../models/Album';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/track_history', auth, async (req: RequestWithUser, res, next) => {
  try {
    if(!req.body.track) {
      return res.status(400).send({error: 'Track is required'});
    }

    const track = await Track.findById(req.body.track);

    if(!track) {
      return res.status(404).send({error: 'Track not found'});
    }

    const trackArtist = await Album.findById(track.album);

    if(!trackArtist) {
      return res.status(404).send({error: 'Album not found'});
    }

    const trackHistory = new TrackHistory({
      user: req.user?._id,
      track: req.body.track,
      artist: trackArtist.artist._id,
      datetime: new Date(),
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

trackHistoryRouter.get('/track_history', auth, async (req: RequestWithUser, res, next) => {
  const trackHistory = await TrackHistory.find({user: req.user?._id}).populate('track').populate('artist').sort({datetime: -1});
  return res.send(trackHistory);
});

export default trackHistoryRouter;