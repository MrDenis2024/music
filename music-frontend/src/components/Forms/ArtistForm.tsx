import React, {useState} from 'react';
import {ArtistMutation} from '../../types';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
  loading: boolean;
}

const ArtistForm: React.FC<Props> = ({onSubmit, loading}) => {
  const [artist, setArtist] = useState<ArtistMutation>({
    name: '',
    image: null,
    information: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...artist});
  };

  return (
    <form className='mt-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new artist</h4>
      <div className='form-group mb-3'>
        <label htmlFor='name' className='mb-1'>Name:</label>
        <input type='text' name='name' id='name' className='form-control' value={artist.name}
               onChange={inputChangeHandler} required/>
      </div>
      <div className='form-group mb-3'>
        <div className='d-flex flex-column'>
          <label htmlFor="information" className="mb-2">Information:</label>
          <textarea id="information" name="information" cols={150} rows={3} className="border"
                    placeholder="Enter artist information" value={artist.information} onChange={inputChangeHandler} ></textarea>
        </div>
      </div>
      <FileInput onChange={fileInputChangeHandler}/>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={loading}>{loading && <ButtonSpinner/>}Save
          artist
        </button>
      </div>
    </form>
  );
};

export default ArtistForm;