/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

export default function Sign({ users }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [errM, seterrM] = useState("");
  const [btn, setbtn] = useState(false);
  const [loading, setloading] = useState(false);

  let checkInputs =
    user.email == "" ||
    user.name == "" ||
    user.mobileNumber == "" ||
    user.password == "";

  useEffect(() => {
    seterrM("");
    const checkDB = users.some((t) => {
      return t.email === user.email || t.mobileNumber === user.mobileNumber;
    });
    const checkNumbers = user.mobileNumber.split("").some((index) => {
      return isNaN(index);
    });

    if (checkInputs) {
      setbtn(false);
    } else if (user.mobileNumber.length != 10 || checkNumbers) {
      seterrM("mobile number is invalid");
      setbtn(false);
    } else if (checkDB) {
      seterrM("email or mobile number is alredy exist");
      setbtn(false);
    } else {
      seterrM("");
      setbtn(true);
    }
  }, [user]);
  const sendToDB = (e) => {
    e.preventDefault();
    seterrM("please fill all feilds");

    if (!btn) {
      return;
    }
    axios
      .post("http://localhost:3000/users", {
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email,
        password: user.password,
        admin: false,
      })
      .then((res) => {
        console.log(res);
        setloading(true);
        setTimeout(() => {
          setloading(false);
          navigate("/login");
        }, 2000);
      })

      .catch((err) => console.log(err));
  };

  return loading ? (
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
  ) : (
    <div className="w-full h-screen flex justify-center items-center bg-[#FFE6C9] text-[#7F265B] font-bold">
      <div className="w-[50%] h-[55%] bg-white flex justify-evenly items-center rounded-xl p-1">
        <div className=" flex flex-col justify-evenly items-center text-center w-full h-full">
          <h2 className="text-xl ">Create an Account</h2>
          <div className="shadow  w-full p-2 h-[80%] ">
            <form
              action=""
              className=" flex flex-col justify-between h-full"
              onSubmit={sendToDB}
            >
              <div className="">
                <div className=" flex flex-col w-full">
                  <label htmlFor="" id="name">
                    name
                  </label>
                  <input
                    value={user.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Mohammed"
                    className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className=" flex flex-col w-full">
                  <label htmlFor="" id="mobileNumber">
                    Mobile Number
                  </label>
                  <input
                    value={user.mobileNumber}
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="05XXXXXX"
                    className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800"
                    onChange={(e) =>
                      setUser({ ...user, mobileNumber: e.target.value })
                    }
                  />
                </div>
                <div className=" flex flex-col w-full">
                  <label htmlFor="#email" id="email">
                    Email
                  </label>
                  <input
                    value={user.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@some.com"
                    className="shadow rounded-xl py-2 px-1 text-sm  outline-none text-zinc-800"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className=" flex flex-col w-full">
                  <label htmlFor="#email" id="email">
                    Password
                  </label>
                  <input
                    value={user.password}
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="gejiw8"
                    className="shadow rounded-xl py-2 px-1 text-sm outline-none text-zinc-800"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className={
                    errM ? "text-sm text-red-500 opacity-70 w-full" : "hidden"
                  }
                >
                  {errM}
                </p>
                <input
                  className={`w-full bg-[#7F265B]  text-white rounded-md h-9 hover:bg-[#7f265bc7] cursor-pointer ${
                    !btn &&
                    "bg-[#7f265b65] cursor-not-allowed hover:bg-[#7f265b65]"
                  }`}
                  value={"Sign-in"}
                  type="submit"
                />
                <Link
                  className="w-full border border-[#7F265B] h-9 text-[#7F265B] leading-8 rounded-md hover:bg-[#7f265b77] cursor-pointer"
                  to={"/login"}
                >
                  login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
