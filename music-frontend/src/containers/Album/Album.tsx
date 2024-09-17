import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorAlbum, selectorFetchOneAlbum} from '../../sotre/albumsSlice';
import {useEffect} from 'react';
import {fetchOneAlbum} from '../../sotre/albumsThunks';
import Spinner from '../../components/Spinner/Spinner';
import {selectUser} from '../../sotre/usersSlice';
import {addTrack} from '../../sotre/trackHistoriesThunks';
import {HistoryTrack} from '../../types';
import {selectLoadingTrackHistory} from '../../sotre/trackHistoriesSlice';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import {toast} from 'react-toastify';

const Album = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const oneAlbum = useAppSelector(selectorAlbum);
  const fetchLoading = useAppSelector(selectorFetchOneAlbum);
  const user = useAppSelector(selectUser);
  const trackLoading = useAppSelector(selectLoadingTrackHistory);

  useEffect(() => {
    dispatch(fetchOneAlbum(id));
  }, [dispatch, id]);

  const buttonHandelClick = async (trackId: string) => {
    try {
      const trackHistory: HistoryTrack = {
        track: trackId,
      };

      await dispatch(addTrack(trackHistory)).unwrap();
      toast.success('Track recorded in history');
    } catch (e) {
      toast.error('Error recording grater in history');
    }
  };

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
              <table className='table table-striped align-middle w-75 mx-auto'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Duration</th>
                    {user && (
                      <th>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                {oneAlbum.tracks.map((track) => (
                  <tr key={track._id}>
                    <td>{track.number}</td>
                    <td>{track.name}</td>
                    <td style={{width: '200px'}}>{track.duration} minutes</td>
                    {user && (
                      <td style={{width: '100px'}}>
                        <button onClick={() => buttonHandelClick(track._id)} className="btn btn-primary"
                                disabled={trackLoading ? trackLoading === track._id : false}>{trackLoading && trackLoading === track._id && (
                          <ButtonSpinner/>)}Play
                        </button>
                      </td>
                    )}
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