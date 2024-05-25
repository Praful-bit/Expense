/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import HomeList from "./HomeList";

function Home() {
  const newMoney = useRef();
  const newDes = useRef();
  const newCat = useRef();
  const [formData, setFormData] = useState([]);

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
    setFormData(resData);
    newMoney.current.value = "";
    newDes.current.value = "";
    newCat.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
        <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Home;
