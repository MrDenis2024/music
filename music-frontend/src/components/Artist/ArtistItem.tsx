import React from 'react';
import {Artist} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';

interface Props {
  artist: Artist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  let artistImage = imageNotFound;

  if(artist.image) {
    artistImage = `${API_URL}/${artist.image}`;
  }

  return (
    <Link to={`/albums/${artist._id}`} className="card text-decoration-none">
      <img src={artistImage} className="card-img-top" alt={artist.name} style={{width: '275px', maxHeight: '183px'}} />
      <div className="card-body">
        <h5 className="card-title text-center">{artist.name}</h5>
      </div>
    </Link>
  );
};

export default ArtistItem;