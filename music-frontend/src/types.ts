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

export interface AlbumWithCount extends Album {
  tracks: number;
}

export interface AlbumsArtist {
  artist: Artist,
  albums: AlbumWithCount[];
}