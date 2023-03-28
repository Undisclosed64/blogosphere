import React from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const username = formData.username;
    const password = formData.password;
    if (username || password === "") {
      setErrorMsg("Input field can not be empty!");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    } else
      axios
        .post("https://real-tick-suit.cyclic.app/api/auth/sign-in", {
          username,
          password,
        })
        .then((result) => {
          if (!result.data.message) {
            const token = result.data.token;
            // console.log(result.data);
            saveToken(token);
            window.location.href = "/";
          } else {
            // console.log(result.data);
            setErrorMsg(result.data.message);
            setTimeout(() => {
              setErrorMsg("");
            }, 2000);
          }
        });
  }
  function saveToken(token) {
    localStorage.setItem("token", `${token}`);
  }

  return (
    <div id="signInSection">
      <div className="errorMsg">{errorMsg}</div>
      <form className="form" action="" onSubmit={handleSubmit} method="POST">
        <div className="signInHeader">Log in</div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          name="username"
          placeholder="Enter name"
          value={formData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          name="password"
          placeholder="Enter password"
          value={formData.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignIn;
