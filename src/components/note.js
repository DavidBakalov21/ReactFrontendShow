import "../styles/noteElement.css";
import axios from "axios";
import { useState } from "react";
function Note({ item, triggerRefresh, categories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleDelete = () => {
    axios
      .delete("http://127.0.0.1:5000/deleteNote", {
        data: {
          email: item.email,
          note: item.text,
          date: item.date,
          category: item.category,
          status: item.status,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          triggerRefresh();
        }
      });
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const EditNote = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const note = formData.get("noteEdit");
    const category = formData.get("category");
    const categoryObj = categories.find((obj) => obj.name === category) || {
      name: "no category",
      color: "#fff",
    };
    const now = new Date();
    const readableDate = now.toLocaleString();
    let status;
    if (isChecked) {
      status = "archived";
    } else {
      status = "active";
    }
    axios
      .patch("http://127.0.0.1:5000/UpdateNote", {
        data: {
          emailEdit: item.email,
          noteEdit: note,
          dateEdit: readableDate,
          categoryEdit: { color: categoryObj.color, name: categoryObj.name },
          statusEdit: status,

          note: item.text,
          date: item.date,
          category: item.category,
          status: item.status,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          triggerRefresh();
        }
      });
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div
      key={item.text + item.date + item.category.name + item.status}
      className="item"
      style={{ backgroundColor: item.category.color }}
    >
      {isEditing ? (
        <form onSubmit={EditNote}>
          <div className="form-group">
            <label htmlFor="noteEdit">Edit note:</label>
            <textarea
              defaultValue={item.text}
              className="form-control"
              id="noteEdit"
              name="noteEdit"
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
          <label className="form-check-label" htmlFor="isArchived">
            Archive
          </label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isArchived"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          <button type="submit" className="note-button">
            Save
          </button>
          <button type="button" onClick={toggleEdit} className="note-button">
            Cancel
          </button>
        </form>
      ) : (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.category.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
            <p className="card-text">{item.text}</p>
            <span className="badge bg-secondary">{item.status}</span>
            <div className="verticalCont">
              <button className="note-button" onClick={handleDelete}>
                Delete
              </button>
              <button className="note-button" onClick={toggleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Note;
