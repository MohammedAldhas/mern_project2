import TopNav from "./TopNav";
import { useEffect, useRef, useState } from "react";
import CreateTask from "./CreateTask";
import axios from "axios";

function User() {
  const reff = useRef();
  const [clicked, setclicked] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3006/").then((res) => {
      setTasks(
        res.data.filter((e) => {
          return e.userId == localStorage.getItem("name");
        })
      );
    });
  }, [tasks]);
  if (!localStorage.getItem("name")) {
    location.href = "/login";
  }

  const filtered = tasks.filter((f) => {
    return f.tasks.title?.toLowerCase()?.includes(search);
  });

  const task = filtered.map((task, index) => {
    return (
      <div
        className="bg-white shadow rounded-2xl p-1 flex flex-col items-center justify-around"
        key={index}
      >
        <h1 className="text-[#7F265B] font-bold text-center text-2xl">
          {task.tasks.title}
        </h1>
        <p className="text-center text-sm">{task.tasks.discription}</p>
      </div>
    );
  });
  // console.log(Date);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#7F265B]">
      <TopNav role={"user"} />

      {clicked && (
        <div
          className="w-full h-full bg-[#0000006f] absolute  block z-40 "
          ref={reff}
          // onClick={() => reff.current.classList.replace("block", "hidden")}
        >
          <CreateTask reff={reff} click={setclicked} />
        </div>
      )}

      <div className="w-[80%] max-h-[75%] p-3 flex flex-col justify-evenly items-center bg-white shadow rounded-xl relative">
        <div className="w-full flex justify-center">
          <input
            type="search"
            placeholder="Search here..."
            className="w-2/5 my-2 rounded-2xl p-1 outline-none border "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value?.toLowerCase());

              // else {
              //   setPageUsers(users.slice(pagination.from, pagination.to));
              // }
            }}
          />
          <button
            className="bg-green-500 text-white h-10 w-24 rounded-xl font-bold"
            onClick={() => {
              setclicked(true);
            }}
          >
            create+
          </button>
        </div>
        <div className="w-full h-full grid grid-cols-4 justify-between p-6 gap-2 overflow-auto">
          {task}
        </div>
      </div>
    </div>
  );
}

export default User;
