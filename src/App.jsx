import "./App.css";
import LoginPage from "./components/SignUp/LoginPage";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import User from "./components/User/User";
import Home from "./components/HomePage/Home";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!auth && <LoginPage />}
      {auth && (
        <div>
          <Header />
          <Home/>
          <User />
          <Outlet />
        </div>
      )}
    </>
  );
}

export default App;
