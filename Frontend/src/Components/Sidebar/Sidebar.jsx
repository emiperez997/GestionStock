import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";

function Sidebar({ isOpen, setIsOpen }) {
  const { transactions, logout, user } = useContext(ProductContext);

  const defaultStyle =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";

  const activeStyle =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-100 dark:bg-gray-700";

  const transactionToday = transactions.filter(
    (transaction) =>
      new Date(transaction.transactionDate).toLocaleDateString() ===
      new Date().toLocaleDateString()
  );

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 right-0 z-50 w-full h-screen transition-transform sm:w-64 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li className="flex justify-end items-center p-2 text-gray-900 rounded-lg dark:text-white group">
            <RxCross2
              className="ms-3 text-xl cursor-pointer hover:scale-125"
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavItem
              to="/"
              defaultStyle={defaultStyle}
              activeStyle={activeStyle}
            >
              <span className="ms-3" onClick={() => setIsOpen(false)}>
                Dashboard
              </span>
            </NavItem>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavItem
              to="/products"
              defaultStyle={defaultStyle}
              activeStyle={activeStyle}
            >
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </NavItem>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <NavItem
              to="/transactions"
              defaultStyle={defaultStyle}
              activeStyle={activeStyle}
            >
              <span
                className="flex-1 ms-3 whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                Transactions
              </span>

              {transactionToday.length > 0 && (
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-red-800 bg-blue-100 rounded-full dark:bg-red-900 dark:text-red-300">
                  {transactionToday.length}
                </span>
              )}
            </NavItem>
          </li>
          {user && user.userRole === "Admin" && (
            <li onClick={() => setIsOpen(false)}>
              <NavItem
                to="/users"
                defaultStyle={defaultStyle}
                activeStyle={activeStyle}
              >
                <span
                  className="flex-1 ms-3 whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                >
                  Users
                </span>
              </NavItem>
            </li>
          )}

          <li>
            <div
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-900 rounded-lg bg-red-900 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-red-950 group"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export { Sidebar };
