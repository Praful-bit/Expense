import "./App.css";
import LoginPage from "./components/SignUp/LoginPage";
import { Outlet } from "react-router-dom";
import User from "./components/User/User";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector(state=> state.theme.darkMode)
  return (
    <>
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white min-h-screen"
            : "bg-gray-300 text-black min-h-screen"
        }
      >
        {!auth && <LoginPage />}
        {auth && (
          <div>
            <Header />
            <Outlet />
            <User />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
