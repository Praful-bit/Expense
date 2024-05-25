import { useEffect, useState } from "react";

function HomeList() {
  const [fetchData, setFetchData] = useState([]);
  console.log(fetchData);

  useEffect(() => {
    const helloFetch = async () => {
      const res = await fetch(
        `https://expense-65a9d-default-rtdb.firebaseio.com/user.json`
      );
      const resData = await res.json();
      console.log(resData);
      const array = [];
      for (const key in resData) {
        console.log(resData[key]);
        array.push({ id: key, ...resData[key] });
      }
      setFetchData(array);
    };
    helloFetch();
  }, []);

  const handleDelete = async (id) => {
    await fetch(
      `https://expense-65a9d-default-rtdb.firebaseio.com/user/${id}.json`,
      {
        method: "DELETE",
      }
    );
    setFetchData((prevData) => prevData.filter((data) => data.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Form Data</h2>
          <ul>
            {fetchData.map((data, index) => (
              <li
                key={index}
                className="mb-2 p-4 border-b border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span>Money: {data.money}</span> 
                  <span>Description: {data.description}</span> 
                  <span>Category: {data.category}</span>
                </div>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">
                  Edit
                </button>{" "}
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
