import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authAction } from "../../Store/Auth";

function Header() {
  const isAuth = useSelector(state=> state.auth.isAuthenticated)
  const dispatch = useDispatch();
   
  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <p className="text-white text-lg font-bold">
        Welcome to Expense Tracker!!!
      </p>
      {isAuth &&
      <span className="text-white">
        Your Profile is not complete.{" "}
        <NavLink className="text-yellow-300 underline" to="/complete">
          Complete Now
        </NavLink>
      </span>}
      <button onClick={()=> dispatch(authAction.logOut())} className="text-xl font-serif text-white">LogOut</button>
    </div>
  );
}

export default Header;
