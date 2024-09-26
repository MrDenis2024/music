import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectorCreateArtistLoading} from '../../store/artistsSlice';
import {createArtist} from '../../store/artistsThunks';
import {ArtistMutation} from '../../types';
import {toast} from 'react-toastify';
import ArtistForm from '../../components/Forms/ArtistForm';

const NewArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectorCreateArtistLoading);

  const onFormSubmit = async (artist: ArtistMutation) => {
    try {
      await dispatch(createArtist(artist)).unwrap();
      navigate('/');
      toast.success('Artist successfully created');
    } catch (e) {
      toast.error('Error creating Artist');
    }
  };

  return (
    <>
      <ArtistForm onSubmit={onFormSubmit} loading={loading} />
    </>
  );
};

export default NewArtist;