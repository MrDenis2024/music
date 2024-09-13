import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchAlbums} from '../../sotre/albumsThunks';
import {selectorAlbums, selectorFetchAlbumsLoading} from '../../sotre/albumsSlice';
import AlbumItem from '../../components/Album/AlbumItem';
import Spinner from '../../components/Spinner/Spinner';

const Albums = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const albumsArtist = useAppSelector(selectorAlbums);
  const fetchLoading = useAppSelector(selectorFetchAlbumsLoading);

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  return (
    <>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {albumsArtist && (
      <>
        <h2 className='mt-4 text-center'>{albumsArtist.artist.name}</h2>
        {albumsArtist.albums.length > 0 ? (
          <div className='mt-3 d-flex gap-4 flex-wrap'>
            {albumsArtist.albums.map((album) => (
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