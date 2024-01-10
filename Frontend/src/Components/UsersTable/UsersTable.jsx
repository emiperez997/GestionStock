import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import { RxPlus } from "react-icons/rx";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function UsersTable() {
  const { users, deleteUser, activateUser, deactivateUser } =
    useContext(ProductContext);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivate = async (email) => {
    try {
      if (users.find((user) => user.email === email).isActivated) {
        await deactivateUser(email);
        toast.success("User deactivated successfully");
        return;
      }

      await activateUser(email);

      toast.success("User activated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative overflow-x-auto">
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-10 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Table of Users
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            In this table you can see all the users and their information.
            <button className="text-sm flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mt-5">
              <Link to={"/users/create"}>
                <RxPlus className="inline-block" />
                Add new user
              </Link>
            </button>
          </p>
        </caption>
        {users.length > 0 && (
          <>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.userId}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 font-bold">{user.userRole}</td>

                  <td className="px-6 py-4">
                    {user.isActivated ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="">
                    <Link to={`/users/edit/${user.userId}`}>
                      <button
                        data-tooltip-id="tooltip-edit"
                        data-tooltip-content={`Edit Product`}
                        data-tooltip-place="bottom"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold p-3 rounded-lg m-2"
                      >
                        <FaEdit />
                        <Tooltip id="tooltip-edit" />
                      </button>
                    </Link>

                    <button
                      data-tooltip-id="tooltip-delete"
                      data-tooltip-content={`Delete Product`}
                      data-tooltip-place="bottom"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-3 rounded-lg m-2"
                      onClick={() => handleDelete(user.userId)}
                    >
                      <FaRegTrashAlt />
                      <Tooltip id="tooltip-delete" />
                    </button>

                    <button
                      data-tooltip-id="tooltip-activate"
                      data-tooltip-content={`${
                        user.isActivated ? "Deactivate" : "Activate"
                      } User`}
                      data-tooltip-place="bottom"
                      className={`text-white font-bold p-3 rounded-lg m-2 ${
                        user.isActivated
                          ? "bg-green-500 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-700"
                      }`}
                      onClick={() => handleActivate(user.email)}
                    >
                      {user.isActivated ? (
                        <FaCheckCircle />
                      ) : (
                        <FaRegCheckCircle />
                      )}

                      <Tooltip id="tooltip-activate" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>

      {users.length === 0 && (
        <div className="text-black mt-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center">No users</h1>
        </div>
      )}
    </div>
  );
}

export { UsersTable };
