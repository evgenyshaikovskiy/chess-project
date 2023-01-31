import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import GameProvider from "./components/game-provider/game-provider";
import "./app.styles.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chess/*" element={<GameProvider />}></Route>
      </Routes>
    </div>
  );
}

export default App;
