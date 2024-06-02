import { useState } from "react";
import axios from "axios";

function CreateTask({ reff, click }) {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  const sendToDB = (e) => {
    axios
      .post("http://localhost:3006/create", {
        userId: localStorage.getItem("name"),
        tasks: {
          title,
          discription,
        },
      })
      .then(() => {
        reff.current.classList.replace("block", "hidden");
        click(false);
      })

      .catch((err) => console.log(err));
  };
  return (
    <div className="w-[40%] h-[35%] bg-white shadow rounded-lg absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center ">
      <div
        className="absolute top-0 right-1 w-[25px] h-[25px] rounded-full p-[3px] leading-4 text-2xl  text-center text-red-500 cursor-pointer hover:text-red-700 "
        onClick={() => {
          reff.current.classList.replace("block", "hidden");
          click(false);
        }}
      >
        X
      </div>

      <form
        className=" flex flex-col justify-between h-full w-full p-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendToDB();
        }}
      >
        <div className="h-[80%] flex flex-col  items-center gap-1">
          <h1 className="text-center font-bold text-2xl">New Task</h1>
          <div className="bg-[#00000034] h-1 w-[20%]"></div>
          <div className=" flex flex-col items-center gap-1 w-[70%]">
            <label className="font-bold ">Title</label>
            <input
              value={title}
              type="text"
              placeholder="Title"
              className="shadow rounded-xl py-2 px-1 text-sm w-full outline-none text-[#0000007e] flex-1"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className=" flex flex-col items-center gap-1 w-full h-full">
            <label className="font-bold">Description</label>
            <textarea
              value={discription}
              name="MobileNumber"
              placeholder="this is ..."
              //   cols={}
              className="shadow rounded-xl py-2 px-1 text-sm w-full h-full outline-none text-zinc-800 flex-1"
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <input
            className="w-2/3 bg-[#7F265B]  text-white rounded-md h-9 hover:bg-[#7f265bc7] cursor-pointer"
            value={"Create"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
