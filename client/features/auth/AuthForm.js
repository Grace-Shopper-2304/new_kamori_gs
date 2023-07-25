import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    if (formName === "login") {
      dispatch(authenticate({ username, password, method: formName }));

    } else if (formName === "signup") {
      const email = evt.target.email.value;
      const fullName = evt.target.fullName.value;
      const address = evt.target.address.value;

      dispatch(authenticate({ username, password, fullName, email, address, method: formName }));
    }
  }

  return (
    <div>
      {name === 'login' && (
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    )}
  {name === 'signup' && ( 
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="fullName">
              <small>Full Name</small>
            </label>
            <input name="fullName" type="text" />
          </div>
          <div>
            <label htmlFor="name">
              <small>Choose a username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Create a Secure Password</small>
            </label>
            <input name="password" type="text" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Mailing Address</small>
            </label>
            <input name="address" type="text" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
