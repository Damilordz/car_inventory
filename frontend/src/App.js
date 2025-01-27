import React from "react";
import "./assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CarInventory from "./pages/CarInventory";
import axios from "./axiosConfig";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <CarInventory />
    </div>
  );
}

export default App;
