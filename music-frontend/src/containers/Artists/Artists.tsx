import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {changeArtist, deleteArtist, fetchArtists} from '../../store/artistsThunks';
import {selectorArtists, selectorFetchArtistsLoading} from '../../store/artistsSlice';
import ArtistItem from '../../components/Artist/ArtistItem';
import Spinner from '../../components/Spinner/Spinner';
import {selectUser} from '../../store/usersSlice';
import {toast} from 'react-toastify';

const Artists = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectorArtists);
  const fetchLoading = useAppSelector(selectorFetchArtistsLoading);
  const filterArtist = artists.filter(artist => (user?.role === 'admin' || artist.isPublished || artist.user === user?._id));

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handelArtistChange = async (artistId: string) => {
    try {
      await dispatch(changeArtist(artistId)).unwrap();
      toast.success('Artist status successfully changed');
      dispatch(fetchArtists());
    } catch (e) {
      toast.error('There was an error changing artist status');
    }
  };

  const handelArtistDelete = async (artistId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данного артиста?')) {
        await dispatch(deleteArtist(artistId)).unwrap();
        dispatch(fetchArtists());
        toast.success('Artist status successfully delete');
      }
    } catch (e) {
      toast.error('There was an error delete artist');
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='text-center'>Performers</h2>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {artists.length > 0 && (
        <div className='mt-3 d-flex gap-4 flex-wrap'>
          {filterArtist.map((artist) => (
            <ArtistItem key={artist._id} artist={artist} handelArtistChange={handelArtistChange} handelArtistDelete={handelArtistDelete}/>
          ))}
        </div>
      )}
      {!fetchLoading && artists.length === 0 &&  <h3 className='text-center'>Артситов или групп нет, добавте их</h3>}
    </div>
  );
};

export default Artists;