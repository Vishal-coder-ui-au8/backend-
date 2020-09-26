import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { key } from "../config";

const Nav = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [name, setName] = useState("");

  const responseGoogle = (response) => {
    console.log(response);
    if (response.accessToken) {
      setName(response.nt.Ad);
      setLogin(true);
    }
  };
  const logout = () => {
    setLogin(false);
  };

  return (
    <div>
      <ul className="topnav">
        <li>
          <Link className="active" to="/">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <ul className="topnav">
              <li>
                <Link to="/calc">Calculator</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/post">Get Posts</Link>
              </li>
              <li className="right">
                <GoogleLogout
                  clientId={key.CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                ></GoogleLogout>
              </li>
            </ul>
          </>
        ) : (
          <li className="right">
            <GoogleLogin
              clientId={key.CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </li>
        )}
      </ul>
      <h1>{name}</h1>
    </div>
  );
};

export default Nav;
