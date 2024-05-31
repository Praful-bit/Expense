import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authAction } from "../../Store/Auth";
import { themeAction } from "../../Store/Theme";

function Header() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const toggle = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(themeAction.toggleTheme());
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={toggle}
              onChange={toggleTheme}
              className="sr-only"
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
                toggle
                  ? "translate-x-6 bg-yellow-500"
                  : "translate-x-0 bg-gray-200"
              }`}
            ></div>
          </div>
          <span className="ml-3 text-white font-medium">
            {toggle ? "Light Mode" : "Dark Mode"}
          </span>
        </label>
        {isAuth && (
          <div className="text-white font-semibold">
            <NavLink
              className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-yellow-300 transition duration-300"
              to="/complete"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a7 7 0 00-7 7v1a7 7 0 0014 0V9a7 7 0 00-7-7zm0 18c-5.523 0-10 4.477-10 10a1 1 0 102 0c0-4.418 3.582-8 8-8s8 3.582 8 8a1 1 0 102 0c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </NavLink>
          </div>
        )}
      </div>
      <button
        onClick={() => dispatch(authAction.logOut())}
        className="text-white text-lg font-serif px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>
    </header>
  );
}

export default Header;
