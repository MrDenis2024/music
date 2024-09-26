import mongoose, {Types} from 'mongoose';
import Artist from './Artist';
import User from './User';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
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
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;