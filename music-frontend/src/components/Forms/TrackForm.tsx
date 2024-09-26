import React, {useEffect, useState} from 'react';
import {TrackMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchArtists} from '../../store/artistsThunks';
import {selectorArtists, selectorFetchArtistsLoading} from '../../store/artistsSlice';
import Spinner from '../Spinner/Spinner';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {fetchAlbums} from '../../store/albumsThunks';
import {selectorAlbums, selectorFetchAlbumsLoading} from '../../store/albumsSlice';

interface Props {
  onSubmit: (track: TrackMutation) => void;
  loading: boolean;
}

const TrackForm: React.FC<Props> = ({onSubmit, loading}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectorArtists);
  const artistsLoading = useAppSelector(selectorFetchArtistsLoading);
  const artistAlbums = useAppSelector(selectorAlbums);
  const albumsLoading = useAppSelector(selectorFetchAlbumsLoading);
  const [track, setTrack] = useState<TrackMutation>({
    album: '',
    name: '',
    duration: '',
    number: '',
    youtubeLink: '',
  });
  const [artistId, setArtistId] = useState('');

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if(artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch, artistId]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    if(name === 'artistId') {
      setArtistId(value);
    } else {
      setTrack((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...track});
  };

  return (
    <form className='mt-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new track</h4>
      <div className="form-group mb-3">
        {artistsLoading ? (
          <div><Spinner/></div>
        ) : (
          <>
            <label htmlFor="artistId" className="mb-1">Artist:</label>
            <select className="form-select" id="artistId" name="artistId" value={artistId} onChange={inputChangeHandler}
                    required>
              <option value="" disabled>Select artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="form-group mb-3">
        {albumsLoading ? (
          <div><Spinner/></div>
        ) : (
          <>
            <label htmlFor="album" className="mb-1">Album:</label>
            <select className="form-select" id="album" name="album" value={track.album} onChange={inputChangeHandler}
                    required>
              <option value="" disabled>{artistId ? ('Select album') : ('Choose an artist first')}</option>
              {artistAlbums?.albums.map((album) => (
                <option key={album._id} value={album._id}>{album.title}</option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="name" className="mb-1">Track name:</label>
        <input type="text" name="name" id="name" className="form-control" value={track.name}
               onChange={inputChangeHandler} required/>
      </div>
      <div className="d-flex gap-5">
        <div className="form-group mb-3">
          <label htmlFor='duration' className='mb-1'>Duration:</label>
          <input type='text' name='duration' id='duration' className='form-control' value={track.duration}
                 onChange={inputChangeHandler} required/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='number' className='mb-1'>Track position in the album:</label>
          <input type='number' name='number' min='1' id='number' className='form-control' value={track.number}
                 onChange={inputChangeHandler} required/>
        </div>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='youtubeLink' className='mb-1'>Youtube Link</label>
        <input type='url' name='youtubeLink' id='youtubeLink' className='form-control' value={track.youtubeLink}
               onChange={inputChangeHandler}/>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={loading}>{loading && <ButtonSpinner/>}Save
          track
        </button>
      </div>
    </form>
  );
};

export default TrackForm;