import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
   if(!req.body.username || !req.body.password) {
     return res.status(400).send({error: 'Username and password required'});
   }

   const user = await User.findOne({ username: req.body.username });

   if(!user) {
     return res.status(400).send({error: 'Username or password not found'});
   }

   const isMatch = await user.checkPassword(req.body.password);

   if(!isMatch) {
     return res.status(400).send({error: 'Username or password not found111'});
   }

   user.generateToken();
   await user.save();

   return res.send(user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;