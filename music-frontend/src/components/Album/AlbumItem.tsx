import React from 'react';
import {AlbumWithCount} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {API_URL} from '../../constants';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {selectorChangeAlbumLoading, selectorDeleteAlbumLoading} from '../../store/albumsSlice';

interface Props {
  album: AlbumWithCount;
  handelAlbumChange: (id: string) => void;
  handelAlbumDelete: (id: string) => void;
}

const AlbumItem: React.FC<Props> = ({album, handelAlbumChange, handelAlbumDelete}) => {
  const user = useAppSelector(selectUser);
  const albumChangeLoading = useAppSelector(selectorChangeAlbumLoading);
  const albumDeleteLoading = useAppSelector(selectorDeleteAlbumLoading);
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
      {user && (user.role === 'admin' || user._id === album.user) && (
        <div className='d-flex justify-content-center gap-5 mb-3'>
          {user?.role === 'admin' && !album.isPublished && (
            <button onClick={() => handelAlbumChange(album._id)} className="btn btn-primary"
                    disabled={albumChangeLoading ? albumChangeLoading === album._id : false}>{albumChangeLoading && albumChangeLoading === album._id && (
              <ButtonSpinner/>)} Publish
            </button>
          )}
          {(user?.role === 'admin' || (user?._id === album.user && !album.isPublished)) && (
            <button onClick={() => handelAlbumDelete(album._id)} className="btn btn-danger"
                    disabled={albumDeleteLoading ? albumDeleteLoading === album._id : false}>{albumDeleteLoading && albumDeleteLoading === album._id && (
              <ButtonSpinner/>)}Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumItem;

