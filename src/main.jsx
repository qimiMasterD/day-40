import { createRoot } from "react-dom/client";

import { Provider as ReduxProvider } from "./libs/react-redux";

import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
        <App></App>
    </ReduxProvider>,
);
