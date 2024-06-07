// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/Expense";
import Home from "./Home";
import HomeList from "./HomeList";
import { Link } from "react-router-dom";

function MainToggle() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const toggle = useSelector((state) => state.expense.toggle);
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(expenseAction.toggleExpense());
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <Link href="/"></Link>
      {toggle && <Home toggle={toggle} toggleHandler={toggleHandler} />}
      {!toggle && <HomeList />}
      {!toggle && (
        <button
          className={`
            fixed bottom-8 right-8 
            ${darkMode ? "bg-violet-600 text-white" : "bg-pink-500 text-white"} 
            rounded-full w-16 h-16 flex items-center justify-center 
            shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none pb-2`}
          onClick={toggleHandler}
        >
          <span className="text-4xl">+</span>
        </button>
      )}
    </div>
  );
}

export default MainToggle;
