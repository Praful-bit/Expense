import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <p className="text-white text-lg font-bold">
        Welcome to Expense Tracker!!!
      </p>
      <span className="text-white">
        Your Profile is not complete.{" "}
        <NavLink className="text-yellow-300 underline" to="/complete">
          Complete Now
        </NavLink>
      </span>
    </div>
  );
}

export default Header;
