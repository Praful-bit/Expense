import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from './Store/index.js'

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import CompleteProfile from "./components/Complete_Profile/CompleteProfile.jsx";
import { Provider } from "react-redux";
import LoginPage from "./components/SignUp/LoginPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/loggin" element={<LoginPage/>}/>
      <Route path="/complete" element={<CompleteProfile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <RouterProvider  router={router}/>
  </Provider>
);
