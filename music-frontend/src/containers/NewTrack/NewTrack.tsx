import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCreateLoadingTracks} from '../../store/tracksSlice';
import {TrackMutation} from '../../types';
import {toast} from 'react-toastify';
import {creatTrack} from '../../store/tracksThunks';
import TrackForm from '../../components/Forms/TrackForm';

const NewTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectorCreateLoadingTracks);

  const onFormSubmit = async (track: TrackMutation) => {
    try {
      await dispatch(creatTrack(track)).unwrap();
      navigate('/');
      toast.success('Track successfully created');
    } catch (e) {
      toast.error('Error creating Track');
    }
  };

  return (
    <>
      <TrackForm onSubmit={onFormSubmit} loading={loading} />
    </>
  );
};

export default NewTrack;