import React from 'react';
import {AlbumWithCount} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {selectorChangeAlbumLoading} from '../../store/albumsSlice';

interface Props {
  album: AlbumWithCount;
  handelAlbumChange: (id: string) => void;
}

const AlbumItem: React.FC<Props> = ({album, handelAlbumChange}) => {
  const user = useAppSelector(selectUser);
  const albumChangeLoading = useAppSelector(selectorChangeAlbumLoading);
  let albumImage = imageNotFound;

  if(album.image) {
    albumImage = `${API_URL}/${album.image}`;
  }

  return (
    <div className='card'>
      <Link to={`/album/${album._id}`} className="text-decoration-none flex-grow-1 text-dark">
        <img src={albumImage} className="card-img-top" alt={album.title} style={{width: '275px', maxHeight: '183px'}}/>
        <div className="card-body text-center">
          <h5 className="card-title">{album.title}</h5>
          <div className='d-flex flex-column'>
            <span>Year of release <strong>{album.year}</strong> year</span>
            <span>Number of records: <strong>{album.tracks}</strong></span>
            {!album.isPublished && (
              <span className='text-secondary'>Not published</span>
            )}
          </div>
        </div>
      </Link>
      <div className='d-flex justify-content-center mb-3'>
        {user?.role === 'admin' && !album.isPublished && (
          <button onClick={() => handelAlbumChange(album._id)} className="btn btn-primary"
                  disabled={albumChangeLoading ? albumChangeLoading === album._id : false}>{albumChangeLoading && albumChangeLoading === album._id && (
            <ButtonSpinner/>)} Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default AlbumItem;

