import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

function TransactionsTable() {
  const { transactions, products } = useContext(ProductContext);

  const showProduct = (productId) => {
    const product = products.find((p) => p.productId === productId);
    alert(product.name);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-10 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Table of transactions
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            In this table you can see details of each transaction. This
            transactions will create automatically when you edit the quantity of
            a product.
          </p>
        </caption>
        {transactions.length > 0 && (
          <>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.transactionId}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {transaction.transactionId}
                  </th>
                  <td className="px-6 py-4 text-left">
                    <div className="flex w-full justify-between items-center">
                      <p>
                        <span className="font-bold">Product ID:</span>{" "}
                        {transaction.productId}
                      </p>
                      <Link to={`/products/${transaction.productId}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-lg m-2">
                          <FiEye />
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <ul>
                      <li>Previous Quantity: {transaction.previousQuantity}</li>
                      <li>New Quantity: {transaction.newQuantity}</li>
                      <li className="mt-3">
                        {transaction.transactionType === "Inflow" ? (
                          <span className="bg-green-900 p-2 rounded-lg">
                            <span className="text-green-400">
                              +
                              {transaction.newQuantity -
                                transaction.previousQuantity}
                            </span>
                          </span>
                        ) : (
                          <span className="bg-red-900 p-2 rounded-lg">
                            <span className="text-red-400">
                              -{" "}
                              {transaction.previousQuantity -
                                transaction.newQuantity}
                            </span>
                          </span>
                        )}
                      </li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {transaction.transactionType === "Outflow"
                      ? "Outflow (Sale)"
                      : "Inflow (Purchase)"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                    {" - "}
                    {new Date(transaction.transactionDate).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold">
                      {transaction.user.username}{" "}
                    </span>

                    <span className="font-thin italic">
                      ({transaction.user.email})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>

      {transactions.length === 0 && (
        <div className="text-black mt-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center">
            No transactions yet
          </h1>
          <p className="text-sm font-thin text-center text-gray-800 dark:text-gray-800">
            In this table you can see details of each transaction. This
            transactions will create automatically when you edit the quantity of
            a product.
          </p>
        </div>
      )}
    </div>
  );
}

export { TransactionsTable };
