import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchArtists} from '../../sotre/artistsThunks';
import {selectorArtists, selectorFetchArtistsLoading} from '../../sotre/artistsSlice';
import ArtistItem from '../../components/Artist/ArtistItem';
import Spinner from '../../components/Spinner/Spinner';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectorArtists);
  const fetchLoading = useAppSelector(selectorFetchArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className='mt-5'>
      <h2 className='text-center'>Performers</h2>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {artists.length > 0 && (
        <div className='mt-3 d-flex gap-4 flex-wrap'>
          {artists.map((artist) => (
            <ArtistItem key={artist._id} artist={artist}/>
          ))}
        </div>
      )}
      {!fetchLoading && artists.length === 0 &&  <h3 className='text-center'>Артситов или групп нет, добавте их</h3>}
    </div>
  );
};

export default Artists;