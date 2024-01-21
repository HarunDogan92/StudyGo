import axios, { Axios } from "axios";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("");

  function submit(e) {
    if (action === "Login") {
      submitLogin(e);
    } else {
      submitRegister(e);
    }
  }

  function submitRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        submitLogin(e);
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.accessToken);
        sessionStorage.setItem("userId", res.data.userId);
        window.location.reload(false);
      });
  }

  return (
    <>
      <form className="login-form" onSubmit={(e) => submit(e)}>
        <h1 htmlFor="item">Login/Create your Account</h1>
        <div className="form-row">
          <label htmlFor="item">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
            type="text"
            id="username"
          ></input>
          <label htmlFor="item">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
            type="text"
            id="password"
          ></input>
        </div>
        <button
          className="btn"
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </button>
        <button
          className="btn"
          onClick={() => {
            setAction("Register");
          }}
        >
          Register
        </button>
      </form>
    </>
  );
}
