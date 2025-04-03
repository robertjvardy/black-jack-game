import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Landing from "./scenes/Landing";
import SeatAssignment from "./scenes/SeatAssignment";
import { useGameContext } from "./module/useGameContext";
import PlayerControls from "./scenes/PlayerControls";

function App() {
  const { gameState } = useGameContext();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {!gameState.started && <Route path="*" element={<Navigate to="/" />} />}
      {gameState.started && (
        <>
          <Route path="/join" element={<SeatAssignment />} />
          <Route path="/playerControls" element={<PlayerControls />} />
        </>
      )}
    </Routes>
  );
}

export default App;
