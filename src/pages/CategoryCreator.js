import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCategory() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email1 = sessionStorage.getItem("user");
    const name = formData.get("name");
    const color = formData.get("color");

    axios
      .post("http://127.0.0.1:5000/createCategory", {
        email: email1,
        color: color,
        name: name,
      })
      .then((response) => {
        if (response.data.status === "success") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  return (
    <div className="container">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color in hex format:</label>
          <input
            type="color"
            className="form-control"
            id="color"
            name="color"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Category
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
