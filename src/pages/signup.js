import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");

    axios
      .post("http://127.0.0.1:5000/signUp", {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
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
      <h2>Sign up</h2>
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
        <div className="form-group">
          <label htmlFor="first_name">first name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">last name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Register;
