import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/track_history', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if(!headerValue) {
      return res.status(401).send({error: 'Header Authorization not find'});
    }

    const [_bearer, token] =headerValue.split(' ');

    if(!token) {
      return res.status(401).send({error: 'Token not found'});
    }

    const user = await User.findOne({token});


    if(!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
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
})

export default trackHistoryRouter;