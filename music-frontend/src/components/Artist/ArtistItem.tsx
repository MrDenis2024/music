import React from 'react';
import {Artist} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {selectorChangeLoadingArtist, selectorDeleteLoadingArtist} from '../../store/artistsSlice';

interface Props {
  artist: Artist;
  handelArtistChange: (id: string) => void;
  handelArtistDelete: (id: string) => void
}

const ArtistItem: React.FC<Props> = ({artist, handelArtistChange, handelArtistDelete}) => {
  const user = useAppSelector(selectUser);
  const artistsChangeLoading = useAppSelector(selectorChangeLoadingArtist);
  const artistDeleteLoading = useAppSelector(selectorDeleteLoadingArtist);
  let artistImage = imageNotFound;

  if(artist.image) {
    artistImage = `${API_URL}/${artist.image}`;
  }

  return (
    <div className='card'>
      <Link to={`/albums/${artist._id}`} className="text-decoration-none flex-grow-1">
        <img src={artistImage} className="card-img-top" alt={artist.name} style={{width: '275px', maxHeight: '183px'}} />
        <div className="card-body text-center">
          <h5 className="card-title text-dark">{artist.name}</h5>
          {!artist.isPublished && (
            <span className='text-secondary'>Not published</span>
          )}
        </div>
      </Link>
      {user && (user.role === 'admin' || user._id === artist.user) && (
        <div className="d-flex justify-content-center gap-5 mb-3">
          {user.role === 'admin' && !artist.isPublished && (
            <button onClick={() => handelArtistChange(artist._id)} className="btn btn-primary"
                    disabled={artistsChangeLoading ? artistsChangeLoading === artist._id : false}>{artistsChangeLoading && artistsChangeLoading === artist._id && (
              <ButtonSpinner/>)}Publish
            </button>
          )}
          {(user.role === 'admin' || (user._id === artist.user && !artist.isPublished)) && (
            <button onClick={() => handelArtistDelete(artist._id)} className="btn btn-danger"
                    disabled={artistDeleteLoading ? artistDeleteLoading === artist._id : false}>{artistDeleteLoading && artistDeleteLoading === artist._id && (
              <ButtonSpinner/>)}Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistItem;