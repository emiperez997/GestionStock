import { RxPlus } from "react-icons/rx";
import { ProductContext } from "../../Context/ProductContext";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function ProductsTable() {
  const { openCreateModal } = useContext(ProductContext);

  const { products, deleteProduct } = useContext(ProductContext);

  const handleDelete = (id) => {
    deleteProduct(id);

    toast.success("Product deleted successfully");
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
          Table of products
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            In this table you can see all the products and their information.
            Also you can edit or delete any product, and see the transactions of
            each product.
          </p>
          <button className="text-sm flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mt-5">
            <Link to={"/products/create"}>
              <RxPlus className="inline-block" />
              Add new product
            </Link>
          </button>
          <button className="text-sm flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg mt-5">
            <Link to={"/products/sell-restock"}>
              <RxPlus className="inline-block" />
              Sell or Restock
            </Link>
          </button>
        </caption>

        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Available Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Added By
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.productId}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.productId}
              </th>

              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.name}
              </td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">${product.price}</td>
              <td className="px-6 py-4">{product.availableQuantity}</td>
              <td className="px-6 py-4">
                <span className="font-bold">{product.user.username} </span>
                <span className="font-thin italic">({product.user.email})</span>
              </td>
              <td className="">
                <Link to={`/products/edit/${product.productId}`}>
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
                  onClick={() => handleDelete(product.productId)}
                >
                  <FaRegTrashAlt />
                  <Tooltip id="tooltip-delete" />
                </button>

                <Link to={`/products/${product.productId}`}>
                  <button
                    data-tooltip-id="tooltip-transactions"
                    data-tooltip-content={`See Transactions`}
                    data-tooltip-place="bottom"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-lg m-2"
                  >
                    <FiEye />
                    <Tooltip id="tooltip-transactions" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ProductsTable };
