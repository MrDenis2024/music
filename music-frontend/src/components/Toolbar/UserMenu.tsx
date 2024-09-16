import React from 'react';
import {User} from '../../types';
import {NavLink} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success" data-bs-toggle="dropdown">
        Hello, {user.username}
      </button>
      <ul className="dropdown-menu">
        <li><NavLink to='/track_history' className="dropdown-item">Track history</NavLink></li>
      </ul>
    </div>
  );
};

export default UserMenu;