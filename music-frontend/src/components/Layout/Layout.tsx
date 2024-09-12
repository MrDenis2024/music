import React from 'react';
import {NavLink} from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className='navbar navbar-dark bg-success'>
        <div className='container'>
          <NavLink to='/' className='navbar-brand'>Music</NavLink>
        </div>
      </header>
      <main className='container flex-grow-1'>
        {children}
      </main>
      <footer className='bg-success'>
        <div className="container text-center">
          <p className='my-4 text-light'>Made by Denis Khrunev student Attractor school 2024</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;