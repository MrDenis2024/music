import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';
import TrackHistory from './models/TrackHistory';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [Eminem, ACDC] = await Artist.create({
    name: 'Eminem',
    image: 'fixtures/Eminem.jpeg',
    information: 'Ма́ршалл Брюс Мэ́терс III (англ. Marshall Bruce Mathers III; род. 17 октября 1972, Сент-Джозеф, Миссури, США), более известный под псевдонимом Эминем (англ. Eminem, стилизовано как EMINƎM)',
  }, {
    name: 'AC/DC',
    image: 'fixtures/ACDC.jpeg',
    information: 'AC/DC (Эй-си/ди-си; сокращённо от англ. alternating current/direct current «переменный ток/постоянный ток») — австралийская рок-группа, сформированная в Сиднее в ноябре 1973 года выходцами из Шотландии, братьями Малькольмом и Ангусом Янгами',
  });

  const [encore, highway, back, slim] = await Album.create({
    title: 'Encore',
    artist: Eminem,
    year: 2004,
    image: 'fixtures/Encore.jpg',
  }, {
    title: 'Highway to Hell',
    artist: ACDC,
    year: 1979,
    image: 'fixtures/Highway.jpeg',
  }, {
    title: 'Back in Black',
    artist: ACDC,
    year: 1980,
    image: 'fixtures/back.jpeg',
  }, {
    title: 'The Slim Shady LP',
    artist: Eminem,
    year: 1999,
    image: 'fixtures/SlimShady.jpeg',
  });

  const [mockingbird] =await Track.create({
    name: 'Mockingbird',
    album: encore,
    duration: '4:11',
    youtubeLink: 'https://www.youtube.com/watch?v=z3JAKqsTBYU',
    number: 5
  }, {
    name: 'Evil deeds',
    album: encore,
    duration: '4:20',
    youtubeLink: 'https://www.youtube.com/watch?v=0Ar43NYdRf4',
    number: 1,
  }, {
    name: 'Never Enough',
    album: encore,
    duration: '2:40',
    youtubeLink: 'https://www.youtube.com/watch?v=8EP8xgGoKLs',
    number: 2,
  }, {
    name: 'Yellow Brick Road',
    album: encore,
    duration: '5:46',
    youtubeLink: 'https://www.youtube.com/watch?v=15V2-dt1w9A',
    number: 3,
  }, {
    name: 'Like Toy Soldiers',
    album: encore,
    duration: '5:22',
    youtubeLink: 'https://www.youtube.com/watch?v=lexLAjh8fPA',
    number: 4
  }, {
    name: 'My Name Is',
    album: slim,
    duration: '4:10',
    youtubeLink: 'https://www.youtube.com/watch?v=LDj8kkVwisY',
    number: 1,
  }, {
    name: 'Guilty Conscience',
    album: slim,
    duration: '3:34',
    youtubeLink: 'https://www.youtube.com/watch?v=IzZmVQhbaTI',
    number: 2,
  }, {
    name: 'Brain Damage',
    album: slim,
    duration: '3:41',
    youtubeLink: 'https://www.youtube.com/watch?v=VxM1BOi8G9o',
    number: 3,
  }, {
    name: 'If I Had',
    album: slim,
    duration: '4:05',
    youtubeLink: 'https://www.youtube.com/watch?v=Wrcbgh66i-c',
    number: 4,
  }, {
    name: 'My Fault',
    album: slim,
    duration: '4:01',
    youtubeLink: 'https://www.youtube.com/watch?v=CTZV5FdLbw0',
    number: 5,
  }, {
    name: 'Highway to Hell',
    album: highway,
    duration: '3:28',
    youtubeLink: 'https://www.youtube.com/watch?v=l482T0yNkeo',
    number: 1,
  }, {
    name: 'Girls Got Rhythm',
    album: highway,
    duration: '3:25',
    youtubeLink: 'https://www.youtube.com/watch?v=YFMF4ZFmtnU',
    number: 2,
  }, {
    name: 'Walk All Over You',
    album: highway,
    duration: '5:08',
    youtubeLink: 'https://www.youtube.com/watch?v=_bP6aVG6L1w',
    number: 3,
  }, {
    name: 'Touch Too Much',
    album: highway,
    duration: '4:27',
    youtubeLink: 'https://www.youtube.com/watch?v=JGftIcp2SC0',
    number: 4,
  }, {
    name: 'Beating Around the Bush',
    album: highway,
    duration: '3:57',
    youtubeLink: 'https://www.youtube.com/watch?v=c4UGLm2QjC8',
    number: 5,
  }, {
    name: 'Back in Black',
    album: back,
    duration: '4:14',
    youtubeLink: 'https://www.youtube.com/watch?v=pAgnJDJN4VA',
    number: 1,
  }, {
    name: 'You Shook Me All Night Long',
    album: back,
    duration: '3:28',
    youtubeLink: 'https://www.youtube.com/watch?v=Lo2qQmj0_h4',
    number: 2,
  }, {
    name: 'Have a Drink on Me',
    album: back,
    duration: '4:00',
    youtubeLink: 'https://www.youtube.com/watch?v=mKc_Ej8RiVs',
    number: 3,
  }, {
    name: 'Shake a Leg',
    album: back,
    duration: '4:03',
    youtubeLink: null,
    number: 4,
  }, {
    name: 'Rock and Roll Ain’t Noise Pollution',
    album: back,
    duration: '4:12',
    youtubeLink: 'https://www.youtube.com/watch?v=X_IWlPHMziU',
    number: 5,
  });

  const user = new User({
    username: 'user',
    password: 'newpassword',
  });
  user.generateToken();
  await user.save();

  const track = new TrackHistory({
    user: user._id,
    track: mockingbird,
    artist: Eminem,
    datetime: new Date(),
  });
  await track.save();

  await db.close();
};

run().catch(console.error);