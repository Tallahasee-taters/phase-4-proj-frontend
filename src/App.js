import "./App.css";
import Signup from "./components/Signup";
import Shows from "./components/Shows";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewShowForm from "./components/NewShowForm";
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import VenueContainer from "./components/VenueContainer";
import { UserProvider } from "./context/userContext";
import UserAccount from "./components/UserAccount";

function App() {
  const [venues, setVenues] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  


  useEffect(() => {
    if (user) {
      fetch("/api/v1/venues")
      .then(resp => resp.json())
      .then(data => setVenues(data))
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/v1/authorized_user").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        setUser(null)
      }
    });
  }, [setUser]);

  if (!user) return (
    <>
     {showLogin ? 
      <Login setShowLogin={setShowLogin} />
     : 
      <Signup setShowLogin={setShowLogin} />
     }
      </>
  )

  return (
    <div className="App">
      <NavBar setUser={setUser}/>
      <Routes> 
        <Route
          path="/home"
          element={<VenueContainer venues={venues} />}
        />
        <Route exact path="/venues/:venue_id/shows" element={<Shows venues={venues}/>} />
        <Route path='/account' element={<UserAccount/>}/>
      </Routes>
    </div>
  );
}

export default App;
