import React, {useEffect, useState} from 'react';
import {AlbumMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorArtists, selectorFetchArtistsLoading} from '../../store/artistsSlice';
import {fetchArtists} from '../../store/artistsThunks';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Spinner from '../Spinner/Spinner';

interface Props {
  onSubmit: (album: AlbumMutation) => void;
  loading: boolean;
}

const AlbumForm: React.FC<Props> = ({onSubmit, loading}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectorArtists);
  const fetchArtistsLoading = useAppSelector(selectorFetchArtistsLoading);
  const [album, setAlbum] = useState<AlbumMutation>({
    artist: '',
    title: '',
    year: '',
    image: null
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...album});
  };

  return (
    <form className='mt-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new album</h4>
      <div className="form-group mb-3">
        {fetchArtistsLoading ? (
          <div><Spinner /></div>
        ) : (
          <>
            <label htmlFor="artist" className="mb-1">Artist:</label>
            <select className="form-select" id="artist" name="artist" onChange={inputChangeHandler}
                    value={album.artist} required>
              <option value="" disabled>Select artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="title" className="mb-1">Title:</label>
        <input type="text" name="title" id="title" className="form-control" value={album.title}
               onChange={inputChangeHandler} required/>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="year" className="mb-1">Year:</label>
        <input type="number" name='year' min='1' id='year' className='form-control w-25' value={album.year}
               onChange={inputChangeHandler} required/>
      </div>
      <FileInput onChange={fileInputChangeHandler}/>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={loading}>{loading && <ButtonSpinner/>}Save
          album
        </button>
      </div>
    </form>
  );
};

export default AlbumForm;