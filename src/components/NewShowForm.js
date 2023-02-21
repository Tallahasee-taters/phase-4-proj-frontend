import { useState } from "react";

const NewShowForm = ({ getShow, setGetShow, venues }) => {
  const [newShow, setNewShow] = useState({
    date: "",
    venue: "",
    city: "",
    comedian: "",
  });

  const handleChange = (e) => {
    setNewShow({ ...newShow, [e.target.name]: e.target.value });
  };

  const createShow = (e) => {
    e.preventDefault();
    fetch("/api/v1/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShow),
    }).then((resp) => {
      if (resp.status === 201) {
        resp.json().then((newShow) => {
          setGetShow([...getShow, newShow]);
        });
      } else {
        resp.json().then((data) => console.log(data));
      }
    });
  };

  return (
    <div>
      <form onSubmit={createShow}>
        <label className="show-form">Date</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={newShow.date}
        />
        <label className="show-form">Comedian</label>
        <input
          type="text"
          name="comedian"
          onChange={handleChange}
          value={newShow.comedian}
        />
        {/* <label className="show-form">Venue</label>
                <input type='text' name="venue" onChange={handleChange} value={newShow.venue}/> */}
        <select name="venue"
              onChange={handleChange}
              value={newShow.venue}
              >
          {venues.map((venue) => (
            <option
              key={venue.id}
              value={venue.name}
            >
              {venue.name}
            </option>
          ))}
        </select>
        <label className="show-form">City</label>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          value={newShow.city}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewShowForm;
