import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import GameProvider from "./components/game-provider/game-provider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chess/*" element={<GameProvider />}></Route>
    </Routes>
  );
}

export default App;
