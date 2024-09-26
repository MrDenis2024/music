import mongoose, {Types} from 'mongoose';
import Album from './Album';
import User from './User';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  youtubeLink: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;