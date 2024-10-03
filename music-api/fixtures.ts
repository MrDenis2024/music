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

  const user = new User({
    username: 'user',
    password: 'newpassword',
    role: 'user',
    displayName: 'Den',
    avatar: 'fixtures/avatar.jpeg',
  });
  user.generateToken();
  await user.save();

  const admin = new User({
    username: 'admin',
    password: 'adminQWERTY',
    role: 'admin',
    displayName: 'Anton',
    avatar: null,
  });
  admin.generateToken();
  await admin.save();

  const [Eminem, ACDC, Rammstein] = await Artist.create({
    user: user._id,
    name: 'Eminem',
    image: 'fixtures/Eminem.jpeg',
    information: 'Ма́ршалл Брюс Мэ́терс III (англ. Marshall Bruce Mathers III; род. 17 октября 1972, Сент-Джозеф, Миссури, США), более известный под псевдонимом Эминем (англ. Eminem, стилизовано как EMINƎM)',
    isPublished: true,
  }, {
    user: admin._id,
    name: 'AC/DC',
    image: 'fixtures/ACDC.jpeg',
    information: 'AC/DC (Эй-си/ди-си; сокращённо от англ. alternating current/direct current «переменный ток/постоянный ток») — австралийская рок-группа, сформированная в Сиднее в ноябре 1973 года выходцами из Шотландии, братьями Малькольмом и Ангусом Янгами',
    isPublished: true,
  }, {
    user: user._id,
    name: 'Rammstein',
    image: 'fixtures/Rammstein.jpeg',
    information: 'Rammstein — немецкая метал-группа, образованная в январе 1994 года в Берлине. Музыкальный стиль группы относится к жанру индастриал-метала (конкретно — его немецкой сцене Neue Deutsche Härte). Основные черты творчества группы: специфический ритм, в котором выдержана большая часть композиций, и эпатирующие тексты песен.',
  });

  const [encore, highway, back, slim, sehnsucht] = await Album.create({
    user: user._id,
    title: 'Encore',
    artist: Eminem,
    year: 2004,
    image: 'fixtures/Encore.jpg',
    isPublished: true,
  }, {
    user: admin._id,
    title: 'Highway to Hell',
    artist: ACDC,
    year: 1979,
    image: 'fixtures/Highway.jpeg',
    isPublished: true,
  }, {
    user: admin._id,
    title: 'Back in Black',
    artist: ACDC,
    year: 1980,
    image: 'fixtures/back.jpeg',
    isPublished: true,
  }, {
    user: user._id,
    title: 'The Slim Shady LP',
    artist: Eminem,
    year: 1999,
    image: 'fixtures/SlimShady.jpeg',
    isPublished: true,
  }, {
    user: user._id,
    title: 'Sehnsucht',
    artist: Rammstein,
    year: 1997,
    image: 'fixtures/Sehnsucht.JPG',
  });

  const [mockingbird] =await Track.create({
    user: user._id,
    name: 'Mockingbird',
    album: encore,
    duration: '4:11',
    youtubeLink: 'https://www.youtube.com/watch?v=z3JAKqsTBYU',
    number: 5,
    isPublished: true
  }, {
    user: user._id,
    name: 'Evil deeds',
    album: encore,
    duration: '4:20',
    youtubeLink: 'https://www.youtube.com/watch?v=0Ar43NYdRf4',
    number: 1,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Never Enough',
    album: encore,
    duration: '2:40',
    youtubeLink: 'https://www.youtube.com/watch?v=8EP8xgGoKLs',
    number: 2,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Yellow Brick Road',
    album: encore,
    duration: '5:46',
    youtubeLink: 'https://www.youtube.com/watch?v=15V2-dt1w9A',
    number: 3,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Like Toy Soldiers',
    album: encore,
    duration: '5:22',
    youtubeLink: 'https://www.youtube.com/watch?v=lexLAjh8fPA',
    number: 4,
    isPublished: true,
  }, {
    user: user._id,
    name: 'My Name Is',
    album: slim,
    duration: '4:10',
    youtubeLink: 'https://www.youtube.com/watch?v=LDj8kkVwisY',
    number: 1,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Guilty Conscience',
    album: slim,
    duration: '3:34',
    youtubeLink: 'https://www.youtube.com/watch?v=IzZmVQhbaTI',
    number: 2,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Brain Damage',
    album: slim,
    duration: '3:41',
    youtubeLink: 'https://www.youtube.com/watch?v=VxM1BOi8G9o',
    number: 3,
    isPublished: true,
  }, {
    user: user._id,
    name: 'If I Had',
    album: slim,
    duration: '4:05',
    youtubeLink: 'https://www.youtube.com/watch?v=Wrcbgh66i-c',
    number: 4,
    isPublished: true,
  }, {
    user: user._id,
    name: 'My Fault',
    album: slim,
    duration: '4:01',
    youtubeLink: 'https://www.youtube.com/watch?v=CTZV5FdLbw0',
    number: 5,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Highway to Hell',
    album: highway,
    duration: '3:28',
    youtubeLink: 'https://www.youtube.com/watch?v=l482T0yNkeo',
    number: 1,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Girls Got Rhythm',
    album: highway,
    duration: '3:25',
    youtubeLink: 'https://www.youtube.com/watch?v=YFMF4ZFmtnU',
    number: 2,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Walk All Over You',
    album: highway,
    duration: '5:08',
    youtubeLink: 'https://www.youtube.com/watch?v=_bP6aVG6L1w',
    number: 3,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Touch Too Much',
    album: highway,
    duration: '4:27',
    youtubeLink: 'https://www.youtube.com/watch?v=JGftIcp2SC0',
    number: 4,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Beating Around the Bush',
    album: highway,
    duration: '3:57',
    youtubeLink: 'https://www.youtube.com/watch?v=c4UGLm2QjC8',
    number: 5,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Back in Black',
    album: back,
    duration: '4:14',
    youtubeLink: 'https://www.youtube.com/watch?v=pAgnJDJN4VA',
    number: 1,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'You Shook Me All Night Long',
    album: back,
    duration: '3:28',
    youtubeLink: 'https://www.youtube.com/watch?v=Lo2qQmj0_h4',
    number: 2,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Have a Drink on Me',
    album: back,
    duration: '4:00',
    youtubeLink: 'https://www.youtube.com/watch?v=mKc_Ej8RiVs',
    number: 3,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Shake a Leg',
    album: back,
    duration: '4:03',
    youtubeLink: null,
    number: 4,
    isPublished: true,
  }, {
    user: admin._id,
    name: 'Rock and Roll Ain’t Noise Pollution',
    album: back,
    duration: '4:12',
    youtubeLink: 'https://www.youtube.com/watch?v=X_IWlPHMziU',
    number: 5,
    isPublished: true,
  }, {
    user: user._id,
    name: 'Sehnsucht',
    album: sehnsucht,
    duration: '4:14',
    youtubeLink: 'https://www.youtube.com/watch?v=CcZHxomhwzg',
    number: 1,
  }, {
    user: user._id,
    name: 'Engel',
    album: sehnsucht,
    duration: '4:25',
    youtubeLink: 'https://www.youtube.com/watch?v=x2rQzv8OWEY',
    number: 2,
  }, {
    user: user._id,
    name: 'Du hast',
    album: sehnsucht,
    duration: '3:55',
    youtubeLink: 'https://www.youtube.com/watch?v=W3q8Od5qJio',
    number: 3,
  });

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