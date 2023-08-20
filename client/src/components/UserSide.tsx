import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextUser } from './Navbar';
import { ContextTypeUser } from '../interfaces/Context';
import { CHECK_IF_ADMIN } from '../graphql/queries/User';
import { useQuery } from '@apollo/client';

const UserSide: React.FC = () => {
  const navigate = useNavigate();
  const { viewUser, setViewUser } = useContext<ContextTypeUser>(ContextUser);

  const token = sessionStorage.getItem('token');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setViewUser(!viewUser);
    navigate('/');
  };

  // Check admin status
  const { loading, error, data } = useQuery(CHECK_IF_ADMIN, {
    variables: { token: sessionStorage.getItem('token') || '' },
  });

  if (!token) {
    // If user is not logged in, show login button
    return (
      <div>
        <button onClick={() => {
          setViewUser(!viewUser);
          navigate('/login');
        }}>Login</button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error checking admin status.</p>;
  }

  const isAdmin = data?.checkIfAdmin.role === 'admin';

  // If user is logged in, show the menu
  return (
    <div>
      UserSide
      <ul className='pl-2 pr-2'>
        {isAdmin && (
          <Link to="/products/add" >
            <li className='border-b border-gray-300 py-2'>Add Product</li>
          </Link>
        )}
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
