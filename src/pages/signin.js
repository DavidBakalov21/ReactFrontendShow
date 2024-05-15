import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post("http://127.0.0.1:5000/signIn", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Success:", response.data);
        if (response.data.status === "success") {
          sessionStorage.setItem("user", email);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link className="links" to="/signup">
          Don't have an account
        </Link>
      </form>
    </div>
  );
}

export default Login;
