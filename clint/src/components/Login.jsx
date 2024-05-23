import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ users }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState(false);
  const nav = useNavigate();
  const submithandle = (e) => {
    e.preventDefault();
    const user = users.filter((e) => {
      return e.email == email && e.password == password;
    });
    console.log(users);
    if (user.length !== 0) {
      localStorage.setItem("name", user[0].name);
      localStorage.setItem("admin", user[0].admin);
      if (user[0].admin) {
        nav("/admin");
      } else {
        nav("/");
      }
    } else {
      seterr(true);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#FFE6C9]  text-[#7F265B] font-bold">
      <div className="w-[50%] h-[50%] bg-white flex justify-evenly items-center rounded-xl p-1">
        {/* <div className="h-full p-1 w-[55%] ">
          <img
            className="h-full  rounded-l-xl"
            src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=900&t=st=1715852766~exp=1715853366~hmac=3e4e8f8c39b580dc405ad716fdedab051bebd344f0f5a2b6451f4a9120fb8ce6"
            alt=""
          />
        </div> */}

        <div className=" flex flex-col justify-evenly items-center text-center w-[95%] h-[95%]">
          <h2 className="text-xl ">Login to your Account</h2>
          <div className="shadow  w-full p-2 h-[80%] ">
            <form
              action=""
              className=" flex flex-col justify-between h-full"
              onSubmit={submithandle}
            >
              <div className="flex flex-col gap-2">
                <div className=" flex flex-col w-full">
                  <label htmlFor="#email" id="email">
                    Email
                  </label>
                  {/* <>ة </> */}
                  <input
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@some.com"
                    className="shadow rounded-xl py-2 px-1 text-sm focus:border border-[#7F265B] outline-none text-zinc-800"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col w-full">
                  <label htmlFor="#email" id="email">
                    Password
                  </label>
                  <input
                    value={password}
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="gejiw8"
                    className="shadow rounded-xl py-2 px-1 text-sm focus:border border-[#7F265B] outline-none text-zinc-800"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="h-[2px] w-full bg-[#7f265b5c] rounded-full relative">
                <p
                  className={
                    err
                      ? "absolute top-3 left-2/4 -translate-x-2/4 text-red-300 font-bold text-sm"
                      : "hidden"
                  }
                >
                  email or password is not correct
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  className="w-full bg-[#7F265B]  text-white rounded-md h-9 hover:bg-[#7f265bc7] cursor-pointer"
                  value={"Login"}
                  type="submit"
                />

                <Link
                  className="w-full border border-[#7F265B] h-9 text-[#7F265B] leading-8 rounded-md hover:bg-[#7f265b77] cursor-pointer"
                  to={"/sign"}
                >
                  Sign-in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
