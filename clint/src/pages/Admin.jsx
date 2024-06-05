/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import Ubdate from "../components/Ubdate";
import Pagination from "@mui/material/Pagination";
// import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
export default function Admin({ users }) {
  //   const [users, setUsers] = useState([]);
  const [pageusers, setPageUsers] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");
  const [iD, setID] = useState("");
  const [pageSize] = useState(6);
  //   let  = 3;
  const [pagination, setPagination] = useState({
    count: 1,
    from: 0,
    to: pageSize,
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const ss = useRef();
  const nav = useNavigate();

  if (!localStorage.getItem("adminNme") && !localStorage.getItem("admin")) {
    // window.location.href("/login");
    location.href = "/login";
  }
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
    // setPageUsers(users);
    setPagination({ ...pagination, count: users.length });
    setPageUsers(users.slice(pagination.from, pagination.to));
  }, [loading, pagination.from, pagination.to]);

  //   }, [loading]);

  const filteredUsers = pageusers.filter((user) => {
    return user.name.toLowerCase().includes(search);
  });

  async function showUbdate(userData) {
    setID(userData._id);
    if (ss.current.className.includes("hidden")) {
      ss.current.classList.replace("hidden", "block");
    } else if (ss.current.className.includes("block")) {
      ss.current.classList.replace("block", "hidden");
    }
    setUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      mobileNumber: userData.mobileNumber,
    });
  }
  function deleteUser(id) {
    setloading(true);
    axios
      .delete(`http://localhost:3000/users${id}`)
      .then(() => {
        console.log("deletes");
      })
      .catch((err) => console.log(err));
  }
  function handlePageChange(e, page) {
    console.log(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#ffe6c9a6] text-[#7F265B] ">
      <div
        className="w-full h-full bg-[#0000006f] absolute  hidden z-40 "
        ref={ss}
        // onClick={() => ss.current.classList.replace("block", "hidden")}
      >
        <Ubdate userData={user} iD={iD} ss={ss} allUser={users} />
      </div>
      {loading ? (
        <div className="w-[20%] h-[20%] shadow rounded-xl bg-[#7F265B] flex justify-center items-center">
          <div className=" bg-white rounded-2xl w-[60%] h-[60%] relative"></div>
          <DotLoader
            color={"#7F265B"}
            loading={loading}
            cssOverride={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
            }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <TopNav role={"Admin"} />
          <div className="w-[80%] h-[70%] p-3 flex flex-col justify-evenly items-center bg-white shadow rounded-xl">
            <div
              className="shadow p-2 bg-[#7F265B] rounded-lg flex flex-col items-center w-full gap-2
      "
            >
              <input
                type="search"
                placeholder="Search here..."
                className="w-2/5 my-2 rounded-2xl p-1 outline-none "
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value?.toLowerCase());
                  if (e.target.value) {
                    setPageUsers(users);
                    // setpageSize(users.length);
                  } else {
                    setPageUsers(users.slice(pagination.from, pagination.to));
                  }
                }}
              />
              <table className="text-center table-auto  bg-slate-100 shadow rounded-lg min-h-[200px] w-full">
                <thead>
                  <tr className="font-bold">
                    <th className="border-b p-1">Id</th>
                    <th className="border p-1">Name</th>
                    <th className="border p-1">Mobile Number</th>
                    <th className="border p-1">Email</th>
                    <th className=" border p-1">Password</th>
                    <th className="border p-1">admin</th>
                    <th className=" p-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => {
                    return (
                      <tr key={user._id} className="relative">
                        <td className="border-t ">{user._id}</td>
                        <td className="border ">{user.name}</td>
                        <td className="border ">{user.mobileNumber}</td>
                        <td className="border ">{user.email}</td>
                        <td className="border ">{user.password}</td>
                        <td className="border ">
                          {user.admin ? "admin" : "user"}
                        </td>
                        <td className="border-t ">
                          <button
                            className="bg-red-500 hover:bg-red-400 text-white rounded-2xl text-sm font-bold m-2 p-1 "
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-teal-600  hover:bg-teal-500 text-white rounded-2xl text-sm font-bold m-2 p-1 "
                            onClick={() => showUbdate(user)}
                          >
                            Ubdate
                          </button>
                          <button
                            className="bg-blue-500  hover:bg-blue-400 text-white rounded-2xl text-sm font-bold m-2 p-1 "
                            onClick={() => {
                              localStorage.setItem("name", user.name);
                              nav("/");
                            }}
                          >
                            Show
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
                color="secondary"
                className="bg-white"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
