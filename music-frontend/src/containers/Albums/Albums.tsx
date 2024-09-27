import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchAlbums} from '../../store/albumsThunks';
import {selectorAlbums, selectorFetchAlbumsLoading} from '../../store/albumsSlice';
import AlbumItem from '../../components/Album/AlbumItem';
import Spinner from '../../components/Spinner/Spinner';
import {selectUser} from '../../store/usersSlice';

const Albums = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const albumsArtist = useAppSelector(selectorAlbums);
  const fetchLoading = useAppSelector(selectorFetchAlbumsLoading);
  const user = useAppSelector(selectUser);
  const filterAlbums = albumsArtist?.albums.filter(album => (user?.role === 'admin' || album.isPublished || album.user === user?._id)) || [];

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  return (
    <>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {albumsArtist && (
      <>
        <h2 className='mt-4 text-center'>{albumsArtist.artist.name}</h2>
        {filterAlbums.length > 0 ? (
          <div className='mt-3 d-flex gap-4 flex-wrap'>
            {filterAlbums.map((album) => (
              <AlbumItem key={album._id} album={album}/>
            ))}
          </div>
        ) : (
          <h3 className="text-center">У данного испольнителя ещё не добавлены альбомы</h3>
        )}
      </>
      )}
      {!fetchLoading && !albumsArtist && <h3 className='mt-5 text-center'>Такого исполнителя нет</h3>}
    </>

  );
};

export default Albums;