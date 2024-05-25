import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Header() {
  const {logout,token} = useContext(AuthContext)
  const[isLoggedIn, setLoggedIn] = useState(!!token)



  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <p className="text-white text-lg font-bold">
        Welcome to Expense Tracker!!!
      </p>
      <button value={isLoggedIn} className="text-xl font-serif text-white" onClick={()=>{logout();setLoggedIn(false)}}>LogOut</button>
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
