import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addUser } from "../../store/userSlice";

export function SignUp() {
 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ username, email, name, password, address, phone }));
  };

  return (
    <>
    <form className="submit">
      <h1 id="submit">Create a new account</h1>
      <div>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        Username:
        <input
          type="text"
          name="lastname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Create a secure password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        Full Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        Mailing Address:
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        Phone:
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Sign up
      </button>
    </form>
    </>
  );
}

export default AllProducts;
