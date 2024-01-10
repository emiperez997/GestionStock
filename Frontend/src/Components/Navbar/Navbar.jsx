import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/dark-logo.png";
import { ProductContext } from "../../Context/ProductContext";

function Navbar() {
  const { isAuthenticated } = useContext(ProductContext);

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const showNavbar = ["/login"].includes(location.pathname) || !isAuthenticated;

  return (
    <>
      {!showNavbar && (
        <div className="fixed w-full top-0 z-50">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <nav className="bg-white border-gray-200 dark:bg-gray-800 w-full h-16 dark:text-white flex justify-between items-center px-5">
            <Link to={"/"} className="flex items-center">
              <img src={logo} alt="logo" className="w-16 h-16" />
              <p className="text-xl">
                <span className="font-bold">Rx</span> Inventory
              </p>
            </Link>

            <RxHamburgerMenu
              className="text-2xl mx-5 cursor-pointer hover:scale-125"
              onClick={() => setIsOpen(!isOpen)}
            />
          </nav>
        </div>
      )}
    </>
  );
}

export { Navbar };
