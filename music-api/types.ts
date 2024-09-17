import {Model} from 'mongoose';

export interface ArtistWithoutId {
  name: string;
  image: string | null;
  information: string | null;
}

export interface AlbumWithoutId {
  artist: string;
  title: string;
  year: number;
  image: string | null;
}

export interface TrackWithoutId {
  album: string;
  name: string;
  duration: string;
  number: number;
  youtubeLink: string | null;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;