import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import TrackHistory from '../models/TrackHistory';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const artist = new Artist({
      user: req.user?._id,
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      information: req.body.information ? req.body.information : null,
    });
    await artist.save();

    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if(artist === null) {
      return res.status(404).send({error: 'Artist not found'});
    }

    const updateArtist = await Artist.findByIdAndUpdate(artist._id, {$set: {isPublished: !artist.isPublished}}, {new: true});
    return res.send(updateArtist);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if(artist === null) {
      return res.status(404).send({error: 'Artist not found'});
    }

    if (req.user?.role === 'admin' || (req.user?.role === 'user' && !artist.isPublished && artist.user.equals(req.user._id))) {
      await Artist.deleteOne({ _id: req.params.id });
      await TrackHistory.deleteMany({artist: req.params.id});
      return res.send({ message: 'Artist deleted successfully' });
    }

    return res.status(403).send({ error: 'You cannot delete this artist' });
  } catch (error) {
    return next(error);
  }
});

export default artistsRouter;