import { Navigate, Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Landing from "./scenes/Landing";
import SeatAssignment from "./scenes/SeatAssignment";
import { useGameContext } from "./module/useGameContext";
import PlayerControls from "./scenes/PlayerControls";
import { useEffect } from "react";
import {
  fetchSeatIndex,
  fetchSeatKey,
  resetLocalStorage,
} from "./module/localStorageUtils";
import Table from "./scenes/Table";

function App() {
  const navigate = useNavigate();
  const { gameState } = useGameContext();
  const gameStarted = gameState.started;

  useEffect(() => {
    const seatKey = fetchSeatKey();
    const seatIndex = fetchSeatIndex();
    if (seatKey && seatIndex) {
      navigate("/playerControls");
    }

    if (!gameStarted) {
      resetLocalStorage();
    }
  }, [navigate, gameStarted]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Landing />} />
      {!gameStarted && <Route path="*" element={<Navigate to="/home" />} />}
      {gameStarted && (
        <>
          <Route path="/table" element={<Table />} />
          <Route path="/join" element={<SeatAssignment />} />
          <Route path="/playerControls" element={<PlayerControls />} />
        </>
      )}
    </Routes>
  );
}

export default App;
