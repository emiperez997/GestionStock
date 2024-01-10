import { useContext, useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { AppRoutes } from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "./Context/ProductContext";
import { Modal } from "./Components/Modal/Modal";

function App() {
  const { loading } = useContext(ProductContext);

  const { openModal, modalContent } = useContext(ProductContext);

  return (
    <>
      <Navbar />

      <div className="mt-16 z-20">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-20 h-20 border-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <AppRoutes />
        )}
      </div>
    </>
  );
}

export default App;
