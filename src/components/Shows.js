import { useState, useEffect } from "react";
import NewShowForm from "./NewShowForm";
import Show from "./Show";
import { useParams } from 'react-router-dom';

const Shows = ({venues}) => {
  const [getShow, setGetShow] = useState([]);
  const [form, setForm] = useState(false);
  const params = useParams()
  const showParams = parseInt(params.venue_id)

  useEffect(() => {
    fetch(`/venues/${showParams}/shows`)
      .then((resp) => resp.json())
      .then((showData) => setGetShow(showData));
  }, [showParams]);

  const mappedShows = getShow.map((show) => <Show key={show.id} show={show} getShow={getShow} setGetShow={setGetShow}/>);

  return (
    <div>
      {mappedShows}
      {form ? <NewShowForm getShow={getShow} setGetShow={setGetShow} venues={venues}/> : null}
      <button onClick={() => setForm((current) => !current)}>New show</button>
    </div>
  );
};

export default Shows;
