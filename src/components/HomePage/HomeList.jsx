import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/Expense";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";

function HomeList() {
  const dataGet = useSelector((state) => state.expense.data);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [editId, setEditId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
 
  const [editData, setEditData] = useState({
    money: "",
    description: "",
    category: "",
  });

  const dispatch = useDispatch();

  console.log(dataGet);

  useEffect(() => {
    const helloFetch = async () => {
      const res = await fetch(
        `https://expense-65a9d-default-rtdb.firebaseio.com/user.json`
      );
      const resData = await res.json();
      const array = [];
      for (const key in resData) {
        array.push({ id: key, ...resData[key] });
      }
      dispatch(expenseAction.getExpense(array));
    };
    helloFetch();
  }, [dispatch]);

  const handleDelete = async (id) => {
    await fetch(
      `https://expense-65a9d-default-rtdb.firebaseio.com/user/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch(expenseAction.deleteExpense({ id }));
  };

  const handleEdit = (id) => {
    const data = dataGet.find((item) => item.id === id); // find the item using id
    if (data) {
      setEditId(id);
      setEditData({
        money: data.money,
        description: data.description,
        category: data.category,
      });
    }
  };

  const handleSave = async (id) => {
    const { money, description, category } = editData; // editData se value li
    await fetch(
      `https://expense-65a9d-default-rtdb.firebaseio.com/user/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          money,
          description,
          category,
        }),
      }
    );
    dispatch(
      expenseAction.updateExpense({
        id,
        money,
        description,
        category,
      })
    );
    setEditId(null); // this thing work like exit
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value })); // for updating
  };

  useEffect(() => {
    const total = dataGet.reduce(
      (sum, expense) => sum + Number(expense.money),
      0
    );
    setTotalPrice(total);
  }, [dataGet]);



  const downloadCSV = () => {
    const csv = Papa.unparse(dataGet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {totalPrice > 10000 ? (
        <div className="flex flex-col items-center mt-2">
          <button
            onClick={downloadCSV}
            className="bg-green-700 text-white px-4 py-2 rounded-lg mb-2"
          >
            Download Your Transactions
          </button>
        </div>
      ) : (
        <div className="flex items-center text-xl italic font-extralight mt-2">
          <div
            title="You have to spend at least 10000 to unlock VIP"
            className="flex items-center cursor-pointer"
          >
            <p className="mr-2 pr-2 font-serif">Total Price :- {totalPrice}</p>
            <p className="text-2xl text-yellow-400">Unlock VIP</p>
          </div>
        </div>
      )}
      <div
        className={`p-8 rounded shadow-md w-full max-w-md ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center font-serif">
          Expense Tracker
        </h1>
        <div className="mt-8">
          <ul>
            {dataGet.map((data) => (
              <li
                key={data.id}
                className={`mb-2 p-6 font-serif border-b flex justify-between items-center ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                {editId === data.id ? (
                  <div>
                    <input
                      type="text"
                      name="money"
                      value={editData.money}
                      onChange={handleChange}
                      className={`border p-2 mb-2 ${
                        darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-white text-black"
                      }`}
                    />
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      className={`border p-2 mb-2 ${
                        darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-white text-black"
                      }`}
                    />
                    <select
                      name="category"
                      value={editData.category}
                      onChange={handleChange}
                      className={`border p-2 mb-2 ${
                        darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <option value="Food">Food</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Salary">Salary</option>
                    </select>
                    <button
                      onClick={() => handleSave(data.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="pr-1">Money: {data.money} </span>
                      <span className="pr-1">
                        Description: {data.description}{" "}
                      </span>
                      <span className="pr-1">Category: {data.category} </span>
                    </div>
                    <button
                      onClick={() => handleEdit(data.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(data.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeList;
