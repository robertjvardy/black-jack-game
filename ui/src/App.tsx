import { Route, Routes } from "react-router";
import "./App.css";
import Landing from "./scenes/Landing";
import SeatAssignment from "./scenes/SeatAssignment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/join" element={<SeatAssignment />} />
    </Routes>
  );
}

export default App;
