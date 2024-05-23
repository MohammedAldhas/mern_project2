import TopNav from "./TopNav";

function User() {
  if (!localStorage.getItem("name")) {
    location.href = "/login";
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#7F265B]">
      <TopNav role={"user"} />
      <div
        className="shadow p-2 bg-[rgb(250,250,250)] rounded-lg flex flex-col justify-center items-center w-[50%] h-[50%] gap-2 text-center text-6xl 
      "
      >
        <h1>Welcome</h1>
        <h1 className="text-[#7F265B]"> {localStorage.getItem("name")} </h1>
        <h1>to</h1>
        <h1>Home Page</h1>
      </div>
    </div>
  );
}

export default User;
