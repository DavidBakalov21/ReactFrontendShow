import { Link } from "react-router-dom";
import "../styles/noteElement.css";
import axios from "axios";
function NoteCreator({ categories, triggerRefresh }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email1 = sessionStorage.getItem("user");
    const note = formData.get("note");
    const category = formData.get("category");
    const categoryObj = categories.find((obj) => obj.name === category) || {
      name: "no category",
      color: "#fff",
    };
    const now = new Date();
    const readableDate = now.toLocaleString();
    axios
      .post("http://127.0.0.1:5000/CreateNote", {
        email: email1,
        category: { color: categoryObj.color, name: categoryObj.name },
        note: note,
        date: readableDate,
      })
      .then((response) => {
        if (response.data.status === "success") {
          triggerRefresh();
        }
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };
  return (
    <div className="container">
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="note">Note:</label>
          <textarea
            className="form-control"
            id="note"
            name="note"
            required
            rows="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select className="form-control" id="category" name="category">
            <option value="no category">no category</option>
            {categories.map((i) => (
              <option key={i.name + i.color} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <Link to={`/categories`} className="category-link">
          Create category
        </Link>
        <button type="submit" className="btn btn-primary">
          Create Note
        </button>
      </form>
    </div>
  );
}
export default NoteCreator;
