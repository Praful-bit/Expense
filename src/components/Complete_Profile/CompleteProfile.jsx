
import { useState } from "react";
import { Link } from "react-router-dom";


function CompleteProfile() {

   const [name,setName] = useState("")
   const [url,setUrl] = useState("")

   const HandleClick=async()=>{
   try{
    const res = await fetch(
     `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCwpa9W1-_fktr3vZIDdvjZZz4iy-3Knro`,
     {
       method: "POST",
       body: JSON.stringify({
         idToken: token,
         displayName: name,
         photoUrl: url,
         returnSecureToken: true
       }),
       headers:{
        "Content-Type":"application/json"
       }
     }
   );
   const resData = await res.json()
   console.log(resData);
   }catch(err){
    console.log(err);
   }
   }

    const getData =async()=>{
    try{
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCwpa9W1-_fktr3vZIDdvjZZz4iy-3Knro`,{
        method:"POST",
        body:JSON.stringify({idToken:token}),
        headers:{'Content-Type' : 'application/json'}
      }
    ); 
    const resData = await res.json()
    console.log(resData);
    const user = resData.users[0];
    setName(user.displayName || "")
    setUrl(user.photoUrl || "")
    }catch(err){
      console.log("getData",err);
    }
    }
   
   


  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contact Details</h2>
        <Link to="/" className="text-red-500">
          Cancel
        </Link>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="fullName" className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 015 5v1a5 5 0 01-10 0V7a5 5 0 015-5z" />
            <path
              fillRule="evenodd"
              d="M12 14a7 7 0 00-7 7v3a1 1 0 001 1h12a1 1 0 001-1v-3a7 7 0 00-7-7zm-5 9a5 5 0 0110 0H7z"
              clipRule="evenodd"
            />
          </svg>
          <span>Full Name:</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="fullName"
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <label htmlFor="profilePhoto" className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile Photo URL</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="profilePhoto"
          className="border border-gray-300 rounded p-2 flex-1"
        />
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={HandleClick}
      >
        Update
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 mx-2 rounded"
        onClick={getData}
      >
        Get Data
      </button>
    </div>
  );
}

export default CompleteProfile;
