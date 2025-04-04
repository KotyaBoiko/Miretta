import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { auth } from "./firebase/firebase-config";

// auth.authStateReady().then(() => {
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
// });
