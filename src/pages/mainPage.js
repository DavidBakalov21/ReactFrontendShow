import "../styles/main.css";
import { useNavigate } from "react-router-dom";
import Note from "../components/note";
import NoteCreator from "../components/noteCreator";
import axios from "axios";
import { useState, useEffect } from "react";
function Main() {
  function parseDate(dateStr) {
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split(".");
    const [hours, minutes, seconds] = timePart.split(":");
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  function GetWordNum(text) {
    const trimmedText = text.trim();
    if (trimmedText === "") {
      return 0;
    }
    const words = trimmedText.split(/\s+/);
    return words.length;
  }
  function GetSpecialWordNum(text) {
    let counter = [];
    let cleanText = text.trim();
    cleanText = cleanText.replace(/[-,.!;:()$#@&*_+<>?/]/g, "");
    const words = cleanText.split(/\s+/);
    for (let word of words) {
      if (!counter.includes(word.toLowerCase())) {
        counter.push(word.toLowerCase());
      }
    }
    return counter.length;
  }
  const navigate = useNavigate();
  const [list, SetList] = useState([]);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [listCategories, SetCategoriesList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [ArchivedHider, archivedHide] = useState(false);
  const [ActiveHider, activeHide] = useState(false);
  const [AddFilter, toggleFilter] = useState(true);
  const [AscendingFiter, setAscending] = useState(false);
  const handleSetAscending = () => {
    setAscending(!AscendingFiter);
  };
  const handleActiveChange = () => {
    activeHide(!ActiveHider);
  };
  const handleArchivedChange = () => {
    archivedHide(!ArchivedHider);
  };
  const handleToggleFilter = () => {
    toggleFilter(!AddFilter);
  };
  const setFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filter = formData.get("filterSelector");
    let sortedNotes = [...displayedNotes];
    if (filter === "category") {
      sortedNotes.sort((a, b) => {
        if (a.category.name < b.category.name) {
          return -1;
        }
        if (a.category.name > b.category.name) {
          return 1;
        }
        return 0;
      });
    } else if (filter === "date") {
      sortedNotes.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        if (!AscendingFiter) {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
    } else if (filter === "word number") {
      sortedNotes.sort((a, b) => {
        const textCountA = GetWordNum(a.text);
        const textCountB = GetWordNum(b.text);
        if (!AscendingFiter) {
          return textCountB - textCountA;
        } else {
          return textCountA - textCountB;
        }
      });
    } else if (filter === "unique words") {
      sortedNotes.sort((a, b) => {
        const textCountA = GetSpecialWordNum(a.text);
        const textCountB = GetSpecialWordNum(b.text);
        if (!AscendingFiter) {
          return textCountB - textCountA;
        } else {
          return textCountA - textCountB;
        }
      });
    }
    if (sortedNotes) {
      setDisplayedNotes(sortedNotes);
    }
  };
  useEffect(() => {
    console.log("test");
    const email1 = sessionStorage.getItem("user");
    if (email1 !== null) {
      axios
        .post("http://127.0.0.1:5000/getCategory", {
          email: email1,
        })
        .then((response) => {
          SetCategoriesList(response.data);
        })
        .catch((error) => SetCategoriesList([]));

      axios
        .post("http://127.0.0.1:5000/getNotes", {
          email: email1,
        })
        .then((response) => {
          SetList(response.data);
        })
        .catch((error) => SetList([]));
    } else {
      navigate("/signin");
    }
  }, [updateTrigger]);
  useEffect(() => {
    const filteredNotes = list.filter((note) => {
      if (ActiveHider && note.status === "active") {
        return false;
      }
      if (ArchivedHider && note.status === "archived") {
        return false;
      }
      return true;
    });
    setDisplayedNotes(filteredNotes);
  }, [list, ActiveHider, ArchivedHider]);
  return (
    <div className="mainContainer">
      <h2 style={{ textAlign: "center" }}>Here are your notes:</h2>
      <div className="horizontalCont">
        <div className="hiderBox">
          <label htmlFor="archivedChecker">Hide archived</label>
          <div>
            <input
              type="checkbox"
              id="archivedChecker"
              checked={ArchivedHider}
              onChange={handleArchivedChange}
            />
          </div>
        </div>
        <div className="hiderBox">
          <label htmlFor="activeChecker">Hide active</label>
          <div>
            <input
              type="checkbox"
              id="activeChecker"
              checked={ActiveHider}
              onChange={handleActiveChange}
            />
          </div>
        </div>
      </div>
      <div className="containerNotes">
        {displayedNotes.map((i) => {
          return (
            <Note
              key={i._id}
              item={i}
              categories={listCategories}
              triggerRefresh={() => setUpdateTrigger(!updateTrigger)}
            />
          );
        })}
      </div>
      <div>
        <button className="note-button" onClick={handleToggleFilter}>
          Add filters
        </button>
        {AddFilter ? (
          <></>
        ) : (
          <form onSubmit={setFilter}>
            <div className="form-group">
              <label htmlFor="filterSelector">Select filter:</label>
              <select
                className="form-control"
                id="filterSelector"
                name="filterSelector"
              >
                <option value="date">by date</option>
                <option value="category">by category</option>
                <option value="word number">by number of words</option>
                <option value="unique words">by number of unique words</option>
              </select>
            </div>
            <div className="hiderBox">
              <label htmlFor="ascendingChecker">
                Ascending order !!won't affect category sorting!!
              </label>
              <div>
                <input
                  type="checkbox"
                  id="ascendingChecker"
                  checked={AscendingFiter}
                  onChange={handleSetAscending}
                />
              </div>
            </div>
            <button type="submit" className="note-button">
              Set filter
            </button>
          </form>
        )}
      </div>
      <NoteCreator
        categories={listCategories}
        triggerRefresh={() => setUpdateTrigger(!updateTrigger)}
      />
    </div>
  );
}
export default Main;
