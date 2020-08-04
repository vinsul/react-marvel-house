import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const history = useHistory();

  const handleLogInSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://marvel-house-api.herokuapp.com/user/log_in",
        { email, password }
      );

      const token = response.data.token;
      const usertoken = response.data.account.username;

      Cookies.set("userToken", token, { expires: 2000 });
      Cookies.set("userName", usertoken, { expires: 2000 });

      setUser({ token: token });

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-form">
          <form onSubmit={(event) => handleLogInSubmit(event)}>
            <h2>LOG IN WITH YOUR EMAIL</h2>
            <div>
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">LOG IN</button>
          </form>
          <div>
            <h2>
              YOU HAVE NO ACCOUNT <br />
              AND YOU WANT TO SIGN IN ?
            </h2>
            <button
              type="button"
              className="create-account-button"
              onClick={() => history.push("/sign_up")}
            >
              CREATE AN ACCOUNT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
