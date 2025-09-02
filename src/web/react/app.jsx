import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";

function App() {
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

const root = createRoot(document.getElementById("test"));
root.render(<App />);