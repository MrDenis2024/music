import React from 'react';
import {User} from '../../types';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../store/usersThunks';
import notPhoto from '../../assests/images/notPhoto.png';
import {API_URL} from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  let userPhoto = notPhoto;

  if(user.avatar) {
    userPhoto = `${API_URL}/${user.avatar}`;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success d-flex align-items-center p-0" data-bs-toggle="dropdown">
        <img src={userPhoto} alt={user.username} className="rounded-5 me-2" style={{width: '40px', height: '40px'}}/>
        Hello, {user.displayName}
      </button>
      <ul className="dropdown-menu">
        <li><NavLink to="/new-artist" className="dropdown-item">Add artist</NavLink></li>
        <li><NavLink to='/new-album' className="dropdown-item">Add album</NavLink></li>
        <li><NavLink to='/new-track' className="dropdown-item">Add track</NavLink></li>
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