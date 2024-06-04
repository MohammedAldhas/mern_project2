import Login from "./components/Login";
import Admin from "./components/Admin";
import Sign from "./components/Sign";
import User from "./components/User";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login users={users}></Login>}></Route>
        <Route path="/sign" element={<Sign users={users}></Sign>}></Route>
        <Route path="/admin" element={<Admin users={users}></Admin>}></Route>
        <Route path="/" element={<User />}></Route>
      </Routes>
      {/* <Login></Login> */}
    </>
  );
}
