import React from 'react';
import {Artist} from '../../types';
import imageNotFound from '../../assests/images/image-not-found.jpg';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {selectorChangeLoadingArtist} from '../../store/artistsSlice';

interface Props {
  artist: Artist;
  handelArtistChange: (id: string) => void;
}

const ArtistItem: React.FC<Props> = ({artist, handelArtistChange}) => {
  const user = useAppSelector(selectUser);
  const artistsChangeLoading = useAppSelector(selectorChangeLoadingArtist);
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
      <div className='d-flex justify-content-center mb-3'>
        {user?.role === 'admin' && !artist.isPublished && (
          <button onClick={() => handelArtistChange(artist._id)} className="btn btn-primary"
                  disabled={artistsChangeLoading ? artistsChangeLoading === artist._id : false}>{artistsChangeLoading && artistsChangeLoading === artist._id && (
            <ButtonSpinner/>)}Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtistItem;