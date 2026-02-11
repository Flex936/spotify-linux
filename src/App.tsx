import "./App.css";
import { invoke } from "@tauri-apps/api/core";

function App() {
  return (
    <main class="container">
      <button onClick={() => invoke("open_spotify")}>Open Spotify</button>
    </main>
  );
}

export default App;
