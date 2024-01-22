import axios, { Axios } from "axios";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    if (action === "Login") {
      submitLogin(e);
    } else {
      submitRegister(e);
    }
  }

  function submitRegister(e) {
    e.preventDefault();
    const regExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])");
    if (password === "") {
      setMessage("Bitte Passwort ausfüllen");
    } else if (!regExp.test(password)) {
      console.log(password);
      setMessage(
        "Passwort muss mindestens einen Großbuchstaben, Kleinbuchstaben und eine Zahl enthalten"
      );
    } else {
      axios
        .post("http://localhost:8080/api/auth/register", {
          username: username,
          password: password,
        })
        .then((res) => {
          submitLogin(e);
        });
    }
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
        <img
          src="/src/img/StudyGoLogoEmptySmall.png"
          alt="StudyGo"
          width="30%"
          height="30%"
        ></img>
        <h1 htmlFor="item" className="login-header">
          Login / Registrieren
        </h1>
        <div className="login-form-row">
          <label htmlFor="item">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
            type="text"
            id="username"
          ></input>
          <label htmlFor="item">Passwort</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
            type="password"
            id="password"
          ></input>
          <p>{message}</p>
        </div>
        <div className="login-btn-container">
          <button
            className="btn-login"
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </button>
          <button
            className="btn-login"
            onClick={() => {
              setAction("Register");
            }}
          >
            Registrieren
          </button>
        </div>
      </form>
    </>
  );
}
