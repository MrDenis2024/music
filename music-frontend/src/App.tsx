import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Artists from './containers/Artists/Artists';
import Albums from './containers/Albums/Albums';
import Album from './containers/Album/Album';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import NewArtist from './containers/NewArtist/NewArtist';
import NewAlbum from './containers/NewAlbum/NewAlbum';
import NewTrack from './containers/NewTrack/NewTrack';
import {useAppSelector} from './app/hooks';
import {selectUser} from './store/usersSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
   <Layout>
     <Routes>
       <Route path='/' element={<Artists />} />
       <Route path='/albums/:id' element={<Albums />} />
       <Route path='/album/:id' element={<Album />} />
       <Route path='/register' element={<Register />} />
       <Route path='/login' element={<Login />} />
       <Route path='/track_history' element={<TrackHistory />} />
       <Route path='/new-artist' element={<ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}><NewArtist /></ProtectedRoute>} />
       <Route path='/new-album' element={<ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}><NewAlbum /> </ProtectedRoute>} />
       <Route path='/new-track' element={<ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}><NewTrack /> </ProtectedRoute>} />
       <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
         пожалуйста обратно!</strong></div>} />
     </Routes>
   </Layout>
  );
};

export default App;
