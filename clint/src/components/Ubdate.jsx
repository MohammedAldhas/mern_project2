import { useEffect, useState } from "react";

import axios from "axios";
function Ubdate({ allUser, iD, ss }) {
  const [users, setUsers] = useState({});
  useEffect(() => {
    setUsers(allUser);
  }, [allUser]);

  function ubdate() {
    ss.current.classList.replace("block", "hidden");
    axios
      .put(`http://localhost:3005/${iD}`, users)
      .then((res) => console.log(res));
    // setloading(true);
  }
  return (
    <div className="w-[40%] h-[35%] bg-white shadow rounded-lg absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center ">
      <div
        className="absolute top-0 right-1 w-[25px] h-[25px] rounded-full p-[3px] leading-4 text-2xl  text-center text-red-500 cursor-pointer hover:text-red-700 "
        onClick={() => ss.current.classList.replace("block", "hidden")}
      >
        X
      </div>

      <form
        className=" flex flex-col justify-between h-full w-full p-2"
        onSubmit={(e) => {
          e.preventDefault();
          ubdate();
        }}
      >
        <div className="h-[80%] flex flex-col justify-evenly">
          <div className=" flex items-center gap-2 ">
            <label className="font-bold">name:</label>
            <input
              value={users.name}
              type="text"
              name="name"
              placeholder="Mohammed"
              className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800 flex-1"
              onChange={(e) => {
                setUsers({ ...users, name: e.target.value });
              }}
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <label className="font-bold">email:</label>
            <input
              value={users.email}
              type="email"
              name="email"
              placeholder="some@some.com"
              className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800 flex-1"
              onChange={(e) => {
                setUsers({ ...users, email: e.target.value });
              }}
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <label className="font-bold">Mobile Number:</label>
            <input
              value={users.mobileNumber}
              type="text"
              name="MobileNumber"
              placeholder="05XXXXXX"
              className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800 flex-1"
              onChange={(e) => {
                setUsers({ ...users, mobileNumber: e.target.value });
              }}
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <label className="font-bold">password:</label>
            <input
              value={users.password}
              type="password"
              name="passw0rd"
              placeholder="dwjdiowjio"
              className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800 flex-1"
              onChange={(e) => {
                setUsers({ ...users, password: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <input
            className="w-2/3 bg-[#7F265B]  text-white rounded-md h-9 hover:bg-[#7f265bc7] cursor-pointer"
            value={"change"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default Ubdate;