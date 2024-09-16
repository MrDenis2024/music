import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>Music</NavLink>
        <div className='d-flex flex-row gap-3 flex-nowrap'>
            <NavLink to="/register" className='btn btn-success'>Sign up</NavLink>
            <NavLink to="/login" className='btn btn-success'>Sign in</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;