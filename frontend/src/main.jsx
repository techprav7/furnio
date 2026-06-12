import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </BrowserRouter>
);
