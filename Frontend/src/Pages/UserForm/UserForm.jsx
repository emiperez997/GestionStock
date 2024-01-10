import { useContext, useEffect, useState } from "react";
import { RxChevronLeft } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ProductContext } from "../../Context/ProductContext";

function UserForm() {
  const { users, createUser, updateUser } = useContext(ProductContext);

  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const userDB = users.find((user) => user.userId === Number(id));
      setUser(userDB);
      return;
    }

    setUser({});
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (!form.get("username")) return toast.error("Username is required");
    if (!form.get("email")) return toast.error("Email is required");
    if (!form.get("role")) return toast.error("Role is required");
    if (!id && !form.get("password"))
      return toast.error("Password is required");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.get("email")))
      return toast.error("Email is invalid");

    const data = {};

    data.username = form.get("username");
    data.email = form.get("email");
    data.userrole = form.get("role");

    if (!id) {
      data.password = form.get("password");
    } else {
      data.password = user.password;
    }

    console.log(data);

    try {
      id ? await updateUser(id, data) : await createUser(data);
      const message = id
        ? "User updated successfully"
        : "User created successfully";
      toast.success(message);
    } catch (error) {
      console.log(error);
      const message = id ? "User update failed" : "User creation failed";
      toast.error(message);
    }

    e.target.reset();
  };

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-80 flex items-center justify-between py-5">
        <Link to={"/users"}>
          <RxChevronLeft className="hover:scale-125 hover:font-bold" />
        </Link>
        <h1 className="font-bold text-2xl">
          {id ? "Edit User" : "Create User"}
        </h1>
        <span></span>
      </div>

      <div className="w-80 p-5 border-black border rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              type="text"
              name="username"
              id="username"
              defaultValue={user?.username}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              type="text"
              name="email"
              id="email"
              defaultValue={user?.email}
            />
          </div>

          {!id && (
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                type="password"
                name="password"
                id="password"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              className="border-gray-300 rounded-lg border p-2"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
          >
            <span>{id ? "Update" : "Create"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export { UserForm };
