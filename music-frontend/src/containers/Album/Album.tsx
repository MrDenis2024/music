import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorAlbum, selectorFetchOneAlbum} from '../../sotre/albumsSlice';
import {useEffect} from 'react';
import {fetchOneAlbum} from '../../sotre/albumsThunks';
import Spinner from '../../components/Spinner/Spinner';

const Album = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const oneAlbum = useAppSelector(selectorAlbum);
  const fetchLoading = useAppSelector(selectorFetchOneAlbum);

  useEffect(() => {
    dispatch(fetchOneAlbum(id));
  }, [dispatch, id]);

  return (
    <div className='mt-5'>
      {fetchLoading && <div className='text-center'><Spinner /></div>}
      {oneAlbum && (
        <div>
          <div className='text-center'>
            <h2>{oneAlbum.album.artist.name}</h2>
            <h3 className='mt-3'>Album: {oneAlbum.album.title}</h3>
          </div>
          {oneAlbum.tracks.length > 0 ? (
            <>
              <h4 className="mt-4 text-center">Tracks</h4>
              <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Duration</th>
                </tr>
                </thead>
                <tbody>
                {oneAlbum.tracks.map((track) => (
                  <tr key={track._id}>
                    <td>{track.number}</td>
                    <td>{track.name}</td>
                    <td>{track.duration} minutes</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </>
          ) : (
            <h3 className="mt-5 text-center">У альбома еще нет треков</h3>
          )}
        </div>
      )}
      {!fetchLoading && !oneAlbum && <h3 className="mt-5 text-center">Такого альбома нет</h3>}
    </div>
  );
};

export default Album;