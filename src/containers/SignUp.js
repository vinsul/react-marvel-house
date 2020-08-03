import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const history = useHistory();

  const handleSignUpSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);

        const response = await axios.post(
          "https://marvel-house-api.herokuapp.com/user/sign_up",
          { email, username, firstname, lastname, password }
        );

        if (response.data) {
          history.push("/log_in");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="main-signup">
        <form
          className="sign-up-form container"
          onSubmit={(event) => handleSignUpSubmit(event)}
        >
          <h2>Create an account</h2>
          <div className="signup-right-side">
            <div>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="text"
                value={firstname}
                placeholder="First Name"
                onChange={(event) => setFirstname(event.target.value)}
              />
              <input
                type="text"
                value={lastname}
                placeholder="Last Name"
                onChange={(event) => setLastname(event.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="signup-right-side-password">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className={errorPassword ? "error" : "ok"}
                type="password"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errorPassword && (
                <span className="error-message">
                  The passwords do not match.
                </span>
              )}
            </div>
            <button type="submit">CREATE ACCOUNT</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
