import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Artists from './containers/Artists';

const App = () => {

  return (
   <Layout>
     <Routes>
       <Route path='/' element={<Artists />} />
       <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
         пожалуйста обратно!</strong></div>} />
     </Routes>
   </Layout>
  );
};

export default App;
