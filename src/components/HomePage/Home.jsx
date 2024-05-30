import { useEffect, useRef, useState } from "react";
import HomeList from "./HomeList";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/Expense";

function Home() {
  const data = useSelector((state) => state.expense.data);
  const newMoney = useRef();
  const newDes = useRef();
  const newCat = useRef();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = data.reduce(
      (sum, expense) => sum + Number(expense.money),
      0
    );
    setTotalPrice(total);
  }, [data]);
console.log(totalPrice);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const moneyValue = newMoney.current.value;
    const descriptionValue = newDes.current.value;
    const cat = newCat.current.value;
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
    console.log(resData);
    const newRes = {
      id: resData.name,
      money: moneyValue,
      description: descriptionValue,
      category: cat,
    };
    dispatch(expenseAction.addExpense(newRes));
    newMoney.current.value = "";
    newDes.current.value = "";
    newCat.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="money"
              className="block text-gray-700 font-medium mb-2"
            >
              Money Spent
            </label>
            <input
              id="money"
              type="number"
              placeholder="Enter here Money You Spent"
              ref={newMoney}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter The Description"
              ref={newDes}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              ref={newCat}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <HomeList />
      </div>
      {totalPrice > 10000 ? (
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4">
          Download Your Transactions
        </button>
      ) : (
        <div className="flex items-center text-xl italic font-extralight mt-4">
          <div
            title="You have to spend at least 100000 to unlock VIP"
            className="flex items-center cursor-pointer"
          >
            <p className="text-2xl text-yellow-400">Unlock VIP</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
