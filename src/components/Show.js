import { useState } from "react";
import UpdateShow from "./UpdateShow";

const Show = ({ show, setGetShow, getShow }) => {
  const [updateForm, setUpdateForm] = useState(false);

  const handleDelete = () => {
    fetch(`/api/v1/shows/${show.id}`, {
      method: "DELETE",
    }).then((resp) =>
      setGetShow((current) => {
        const updated_shows = current.filter((ele) => ele.id !== show.id);
        return updated_shows;
      })
    );
  };
console.log(show)

  return (
    <div className="showCard">
      <span className="showDate">{show.date}</span>
      <span className="comedianName">
        <h1>{show.comedian.name}</h1>
      </span>
      <span className="venueName">
        <h3>{show.venue.name}</h3>
      </span>
      <span className="venueCity">
        <h3>{show.venue.city}</h3>
      </span>
      {updateForm ? (
        <UpdateShow
          show={show}
          setGetShow={setGetShow}
          getShow={getShow}
          setUpdateForm={setUpdateForm}
        />
      ) : null}
      <button onClick={() => setUpdateForm((current) => !current)}>🎙</button>
      <button onClick={() => handleDelete()}>🗑</button>
    </div>
  );
};

export default Show;
