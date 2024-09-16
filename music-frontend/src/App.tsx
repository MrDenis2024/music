import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Artists from './containers/Artists/Artists';
import Albums from './containers/Albums/Albums';
import Album from './containers/Album/Album';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const App = () => {

  return (
   <Layout>
     <Routes>
       <Route path='/' element={<Artists />} />
       <Route path='/albums/:id' element={<Albums />} />
       <Route path='/album/:id' element={<Album />} />
       <Route path='/register' element={<Register />} />
       <Route path='/login' element={<Login />} />
       <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
         пожалуйста обратно!</strong></div>} />
     </Routes>
   </Layout>
  );
};

export default App;
