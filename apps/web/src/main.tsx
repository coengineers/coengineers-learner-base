import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { applyBrand } from "./brand";
applyBrand();
const root = createRoot(document.getElementById("root")!);
void import("./App")
  .then(({ App }) =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  )
  .catch(() => {
    root.render(
      <main className="startup-error">
        <h1>We cannot connect right now.</h1>
        <p>Your work has not been changed. Try again in a moment.</p>
        <button onClick={() => location.reload()}>Try again</button>
      </main>,
    );
  });
