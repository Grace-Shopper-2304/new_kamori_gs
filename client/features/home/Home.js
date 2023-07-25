import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const location = useLocation();
  const welcome = ["/home", "/signup", "/login"].includes(location.pathname);

  return (
    username && welcome ? (
      <>
      <div>
      <h3 className="welcome">Welcome, {username}!</h3>
    </div>
    </>
    ) : null
  );
};

export default Home;
