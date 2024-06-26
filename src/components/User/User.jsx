import { useSelector } from "react-redux";

function User() {
  const token = useSelector((state) => state.auth.token);
  const handleClick = async () => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCwpa9W1-_fktr3vZIDdvjZZz4iy-3Knro`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log(err);
    }
    const resData = await res.json();
    console.log(resData);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-red-500 border rounded-md py-2 px-2 cursor-pointer"
      >
        Verify Email
      </button>
    </div>
  );
}

export default User;
