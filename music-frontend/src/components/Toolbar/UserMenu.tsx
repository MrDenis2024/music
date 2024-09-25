import React from 'react';
import {User} from '../../types';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../store/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success" data-bs-toggle="dropdown">
        Hello, {user.username}
      </button>
      <ul className="dropdown-menu">
        <li><NavLink to='/track_history' className="dropdown-item">Track history</NavLink></li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;