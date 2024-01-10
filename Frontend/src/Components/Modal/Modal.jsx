import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { createPortal } from "react-dom";

function Modal({ children }) {
  const { closeModal } = useContext(ProductContext);

  return createPortal(
    <div className="fixed h-screen w-full bg-gray-800/80 z-50 flex items-center justify-center">
      <div className="bg-gray-800 p-5 h-80 w-80 text-white rounded-lg">
        <div className="flex justify-end cursor-pointer">
          <span onClick={closeModal}>&times;</span>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };
