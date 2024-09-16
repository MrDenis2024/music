export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string | null;
}

export interface Album {
  _id: string;
  artist: string;
  title: string;
  year: number;
  image: string | null;
}

export interface Track {
  _id: string;
  album: string;
  name: string;
  duration: string;
  number: number;
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

export interface User {
  _id: string;
  username: string;
  token: string;
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