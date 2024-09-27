import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorAlbum, selectorFetchOneAlbum} from '../../store/albumsSlice';
import {useEffect, useState} from 'react';
import {fetchOneAlbum} from '../../store/albumsThunks';
import Spinner from '../../components/Spinner/Spinner';
import {selectUser} from '../../store/usersSlice';
import {addTrack} from '../../store/trackHistoriesThunks';
import {HistoryTrack, Track} from '../../types';
import {selectLoadingTrackHistory} from '../../store/trackHistoriesSlice';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import {toast} from 'react-toastify';
import Modal from '../../components/Modal/Modal';
import {changeTrack, deleteTrack} from '../../store/tracksThunks';
import {selectorDeleteTrackLoading, selectorLoadingChangeTrack} from '../../store/tracksSlice';

const Album = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const oneAlbum = useAppSelector(selectorAlbum);
  const fetchLoading = useAppSelector(selectorFetchOneAlbum);
  const user = useAppSelector(selectUser);
  const trackLoading = useAppSelector(selectLoadingTrackHistory);
  const trackChangeLoading = useAppSelector(selectorLoadingChangeTrack);
  const deleteTrackLoading = useAppSelector(selectorDeleteTrackLoading);
  const filteredTracks = oneAlbum?.tracks.filter(track => user?.role === 'admin' || track.isPublished || track.user === user?._id) || [];

  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOneAlbum(id));
  }, [dispatch, id]);

  const buttonHandelClick = async (track: Track) => {
    try {
      const trackHistory: HistoryTrack = {
        track: track._id,
      };

      await dispatch(addTrack(trackHistory)).unwrap();
      toast.success('Track recorded in history');
      if(track.youtubeLink) {
        setShowModal(true);
        setPlayingTrack(track.youtubeLink);
      }
    } catch (e) {
      toast.error('Error recording grater in history');
    }
  };

  const handelTrackChange = async (trackId: string) => {
    try {
      await dispatch(changeTrack(trackId)).unwrap();
      toast.success('Track status successfully changed');
      dispatch(fetchOneAlbum(id));
    } catch (e) {
      toast.error('There was an error changing track status');
    }
  };

  const handelTrackDelete = async (trackId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данный трэк?')) {
        await dispatch(deleteTrack(trackId)).unwrap();
        dispatch(fetchOneAlbum(id));
        toast.success('Track successfully delete');
      }
    } catch (e) {
      toast.error('There was an error delete track');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPlayingTrack(null);
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
          {filteredTracks.length > 0 ? (
            <>
              <h4 className="mt-4 text-center">Tracks</h4>
              <table className='table table-striped align-middle w-75 mx-auto'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Duration</th>
                    {user && (
                      <th className='text-center' style={{width: '490px'}}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                {filteredTracks.map((track) => (
                  <tr key={track._id}>
                    <td>{track.number}</td>
                    <td>{track.name}</td>
                    <td style={{width: '200px'}}>{track.duration} minutes</td>
                    {user && (
                      <td className={`${(user.role === 'admin' || (user._id === track.user && !track.isPublished)) ? 'd-flex gap-3 align-items-center justify-content-center': 'text-center'}`} style={{maxWidth: '490px'}}>
                        <button onClick={() => buttonHandelClick(track)} className="btn btn-primary"
                                disabled={trackLoading ? trackLoading === track._id : false}>{trackLoading && trackLoading === track._id && (
                          <ButtonSpinner/>)}Play
                        </button>
                        {(user.role === 'admin' || (user._id === track.user && !track.isPublished)) && (
                          <button onClick={() => handelTrackDelete(track._id)} className="btn btn-danger"
                                  disabled={deleteTrackLoading ? deleteTrackLoading === track._id : false}>{deleteTrackLoading && deleteTrackLoading === track._id && (
                            <ButtonSpinner/>)}Delete
                          </button>
                        )}
                        {user?.role === 'admin' && !track.isPublished && (
                          <button onClick={() => handelTrackChange(track._id)} className="btn btn-primary"
                                  disabled={trackChangeLoading ? trackChangeLoading === track._id : false}>{trackChangeLoading && trackChangeLoading === track._id && (
                            <ButtonSpinner/>)}Publish
                          </button>
                        )}
                        {!track.isPublished && (
                          <span className='text-secondary'>Not published</span>
                        )}
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
      <Modal show={showModal} onClose={() => closeModal()} track={playingTrack} />
    </div>
  );
};

export default Album;