import React from 'react';
import {AlbumWithCount} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import {Link} from 'react-router-dom';

interface Props {
  album: AlbumWithCount;
}

const AlbumItem: React.FC<Props> = ({album}) => {
  let albumImage = imageNotFound;

  if(album.image) {
    albumImage = `${API_URL}/${album.image}`;
  }

  return (
    <Link to={`/album/${album._id}`} className="card text-decoration-none">
      <img src={albumImage} className="card-img-top" alt={album.title} style={{width: '275px', maxHeight: '183px'}} />
      <div className="card-body text-center">
        <h5 className="card-title">{album.title}</h5>
        <div className='d-flex flex-column'>
          <span>Year of release <strong>{album.year}</strong> year</span>
          <span>Number of records: <strong>{album.tracks}</strong></span>
        </div>
      </div>
    </Link>
  );
};

export default AlbumItem;

