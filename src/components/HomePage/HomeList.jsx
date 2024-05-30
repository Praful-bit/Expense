import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/Expense";

function HomeList() {
  const dataGet = useSelector((state) => state.expense.data);
  const [editId, setEditId] = useState(null);
  
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
        money:data.money,
        description:data.description,
        category:data.category
      })
    }
  };

  const handleSave = async (id) => {
 const {money,description,category} = editData; // editData se value li
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
    dispatch(expenseAction.updateExpense({
      id,
      money,
      description,
      category,
    }));
    setEditId(null) // this thing work like exit
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value })); // for updating 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Form Data</h2>
          <ul>
            {dataGet.map((data) => (
              <li
                key={data.id}
                className="mb-2 p-4 border-b border-gray-200 flex justify-between items-center"
              >
                {editId === data.id ? (
                  <div>
                    <input
                      type="text"
                      name="money"
                      value={editData.money}
                      onChange={handleChange}
                      className="border p-2 mb-2"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      className="border p-2 mb-2"
                    />
                    <select
                      name="category"
                      value={editData.category}
                      onChange={handleChange}
                      className="border p-2 mb-2"
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
                      <span>Money: {data.money} </span>
                      <span>Description: {data.description} </span>
                      <span>Category: {data.category} </span>
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
