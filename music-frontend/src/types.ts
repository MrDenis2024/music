export interface Artist {
  _id: string;
  user: string;
  name: string;
  image: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  image: File | null;
  information: string;
}

export interface Album {
  _id: string;
  user: string;
  artist: string;
  title: string;
  year: number;
  image: string | null;
  isPublished: boolean;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  year: string;
  image: File | null;
}

export interface Track {
  _id: string;
  user: string;
  album: string;
  name: string;
  duration: string;
  number: number;
  youtubeLink: string | null;
  isPublished: boolean;
}

export interface TrackMutation {
  album: string;
  name: string;
  duration: string;
  number: string;
  youtubeLink: string;
}

export interface AlbumWithCount extends Album {
  tracks: number;
}

export interface AlbumsArtist {
  artist: Artist,
  albums: AlbumWithCount[];
}

export interface AlbumWithArtist extends Omit<Album, 'artist'> {
  artist: Artist;
}

export interface AlbumWithTracks {
  album: AlbumWithArtist,
  tracks: Track[],
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface HistoryTrack {
  track: string;
}

export interface HistoryTracks {
  _id: string;
  user: string;
  track: Track;
  artist: Artist;
  datetime: string;
}