import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTracks} from '../../store/trackHistoriesThunks';
import {
  selectFetchLoadingTrackHistory,
  selectTrackHistories
} from '../../store/trackHistoriesSlice';
import dayjs from 'dayjs';
import Spinner from '../../components/Spinner/Spinner';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const historyTracks = useAppSelector(selectTrackHistories);
  const historyLoading = useAppSelector(selectFetchLoadingTrackHistory);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div>
          <h2 className='text-center mt-5'>Track history</h2>
          {historyLoading && <div className='text-center'><Spinner /></div>}
          {historyTracks.length > 0 && (
            <div>
              <table className='table table-striped align-middle w-75 mx-auto'>
                <thead>
                  <tr>
                    <th>Name Artist</th>
                    <th>Name Track</th>
                    <th>Audition date</th>
                  </tr>
                </thead>
                <tbody>
                  {historyTracks.map((track) => (
                    <tr key={track._id}>
                      <td>{track.artist.name}</td>
                      <td>{track.track.name}</td>
                      <td>{dayjs(track.datetime).format('DD.MM.YYYY HH:mm')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!historyLoading && historyTracks.length === 0 && (
            <h3 className="text-center mt-4">You don't have any tracks listened to yet</h3>
          )}
        </div>
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  );
};

export default TrackHistory;