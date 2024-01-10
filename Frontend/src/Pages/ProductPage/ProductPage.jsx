import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { RxChevronLeft } from "react-icons/rx";

function ProductPage() {
  const { products } = useContext(ProductContext);

  const { id } = useParams();

  const product = products.find((product) => product.productId === Number(id));

  return (
    <>
      {product && (
        <div className="w-full py-10 flex flex-col items-center ">
          <div className="flex flex-col w-80 justify-center">
            <div className="bg-gray-800 p-5 items-center justify-center text-white">
              <Link to={"/products"}>
                <RxChevronLeft className="hover:scale-125 hover:font-bold" />
              </Link>
              <ol className="text-white divide-y">
                <li>
                  <h2 className="py-4 text-center text-2xl font-bold text-gray-90">
                    {product.name}
                  </h2>
                </li>
                <li className="flex justify-between py-4">
                  <span className="font-bold">Product ID: </span>
                  {product.productId}
                </li>
                <li className="flex justify-between py-4">
                  <span className="font-bold">Description: </span>
                  {product.description}
                </li>
                <li className="flex justify-between py-4">
                  <span className="font-bold">Quantity: </span>
                  {product.availableQuantity}
                </li>
                <li className="flex justify-between py-4">
                  <span className="font-bold">Price: </span>$ {product.price}
                </li>
              </ol>
            </div>
          </div>

          {product.transactions.length > 0 ? (
            <div className="w-full mt-10">
              <div className="">
                <h2 className="text-center text-2xl font-bold text-gray-90">
                  Transactions
                </h2>
                <p className="text-sm font-thin text-center text-gray-500 dark:text-gray-400">
                  Here you can see all the transactions of this product.
                </p>
              </div>
              <table className="text-white w-full mt-2">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      #
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
                  {product.transactions.map((transaction) => (
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
                        <ul>
                          <li>
                            Previous Quantity: {transaction.previousQuantity}
                          </li>
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
                        {new Date(
                          transaction.transactionDate
                        ).toLocaleDateString()}
                        {" - "}
                        {new Date(
                          transaction.transactionDate
                        ).toLocaleTimeString()}
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
              </table>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-center">
                No transactions yet
              </h1>
              <p className="text-sm font-thin text-center text-gray-500 dark:text-gray-400">
                Here you can see all the transactions of this product.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { ProductPage };
