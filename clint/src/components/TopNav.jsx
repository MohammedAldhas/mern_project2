import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopNav({ role }) {
  const [clicked, setclicked] = useState(false);
  return (
    <nav className="absolute top-0 w-full h-14 flex justify-center">
      <ul className="w-[80%] p-3 bg-[#ffffff4a] flex items-center justify-between">
        <div
          className={`w-36  absolute top-[67px] right-[125px] bg-[#7F265B] shadow p-3 flex justify-center items-center ${
            clicked ? "block" : "hidden"
          }`}
        >
          <Link
            className=" text-red-400  hover:text-red-500"
            onClick={() => localStorage.clear()}
            to={"/login"}
          >
            LogOut
          </Link>
          <div className="w-8 h-8 absolute bg-transparent right-[20px] top-[-32px] border-[16px] border-t-transparent border-l-transparent border-r-transparent border-b-[#7F265B]"></div>
        </div>
        <h2 className="font-bold text-xl justify-self-center">
          Welcome {role}
        </h2>
        <h2
          className="font-bold text-xl cursor-pointer"
          onClick={() => {
            clicked ? setclicked(false) : setclicked(true);
          }}
        >
          {localStorage.getItem("name")}
        </h2>
      </ul>
    </nav>
  );
}

// border: 1px solid;
// border-color: transparent transparent olivedrab transparent;
// border-width: 16px;
// background-color: transparent;
