import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextUser } from './Navbar';
import { ContextTypeUser } from '../interfaces/Context';

const UserSide = () => {
  const navigate = useNavigate();
  const { viewUser, setViewUser } = useContext<ContextTypeUser>(ContextUser);

  const token = sessionStorage.getItem('token');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setViewUser(!viewUser)
    navigate('/')
  };

  if (!token) {
    // If user is not logged in, show login button
    return (
      <div>
        <button onClick={() => {
            setViewUser(!viewUser)
            navigate('/login')}}>Login</button>
      </div>
    );
  }

  // If user is logged in, show the menu
  return (
    <div>
      UserSide
      <ul className='pl-2 pr-2'>
        <Link to='/myorders'>
        <li className='border-b border-gray-300 py-2'>My Orders</li>
        </Link>
        <li className='border-b border-gray-300 py-2'>Change Password</li>
        <li className='border-b border-gray-300 py-2' onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
}

export default UserSide;
