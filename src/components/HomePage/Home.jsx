/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/Expense";
import "boxicons";

function Home({ toggleHandler }) {
  const data = useSelector((state) => state.expense.data);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const newMoney = useRef();
  const newDes = useRef();
  const newCat = useRef();
  const dispatch = useDispatch();
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moneyValue = newMoney.current.value;
    const descriptionValue = newDes.current.value;
    const cat = newCat.current.value;
    try{
      const res = await fetch(
        `https://expense-65a9d-default-rtdb.firebaseio.com/user.json`,
        {
          method: "POST",
          body: JSON.stringify({
            money: moneyValue,
            description: descriptionValue,
            category: cat,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      const newRes = {
        id: resData.name,
        money: moneyValue,
        description: descriptionValue,
        category: cat,
      };
      dispatch(expenseAction.addExpense(newRes));
    }catch(err){
      console.log(err)
    }
    newMoney.current.value = "";
    newDes.current.value = "";
    newCat.current.value = "";
  };

  return (
    <div
      className={`pt-3 min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-800 " : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`p-8 rounded shadow-md w-full max-w-lg ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <button onClick={toggleHandler} className="focus:outline-none">
            <box-icon name="exit"></box-icon>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="money" className="block font-medium mb-2">
              Money Spent
            </label>
            <input
              id="money"
              type="number"
              placeholder="Enter here Money You Spent"
              ref={newMoney}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter The Description"
              ref={newDes}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              ref={newCat}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
            >
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Save it!!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
