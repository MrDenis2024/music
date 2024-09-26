import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCreateAlbumLoading} from '../../store/albumsSlice';
import {AlbumMutation} from '../../types';
import {createAlbum} from '../../store/albumsThunks';
import {toast} from 'react-toastify';
import AlbumForm from '../../components/Forms/AlbumForm';

const NewAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectorCreateAlbumLoading);

  const onFormSubmit = async (album: AlbumMutation) => {
    try {
      dispatch(createAlbum(album)).unwrap();
      navigate('/');
      toast.success('Album successfully created');
    } catch (e) {
      toast.error('Error creating Artist');
    }
  };

  return (
    <>
      <AlbumForm onSubmit={onFormSubmit} loading={loading} />
    </>
  );
};

export default NewAlbum;