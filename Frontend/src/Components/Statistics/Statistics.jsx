import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { RxLoop } from "react-icons/rx";
import { MdQueryStats } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { LuBaggageClaim } from "react-icons/lu";

function Statistics() {
  const { products, transactions } = useContext(ProductContext);

  const [totalMovements, setTotalMovements] = useState(0);
  const [balanceSales, setBalanceSales] = useState(0);
  const [salesNumber, setSalesNumber] = useState(0);
  const [productSellOut, setProductSellOut] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    let totalMovements = 0;
    let balanceSales = 0;
    let salesNumber = 0;
    let productSellOut = 0;
    let totalProducts = 0;

    transactions.forEach((transaction) => {
      totalMovements++;
      if (transaction.transactionType === "Outflow") {
        salesNumber++;

        const productPrice = products.find(
          (p) => p.productId === transaction.productId
        ).price;

        balanceSales +=
          (transaction.previousQuantity - transaction.newQuantity) *
          productPrice;

        productSellOut +=
          transaction.previousQuantity - transaction.newQuantity;
      }
    });

    products.forEach((product) => {
      totalProducts += product.availableQuantity;
    });

    setTotalMovements(totalMovements);
    setBalanceSales(balanceSales);
    setSalesNumber(salesNumber);
    setProductSellOut(productSellOut);
    setTotalProducts(totalProducts);
  }, [products]);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
            <RxLoop className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Movements
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {totalMovements}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <MdQueryStats className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Balance Sales
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              $ {balanceSales}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Sales Number
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {salesNumber}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
            <IoBagCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Product Sell Out
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {productSellOut}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-gray-400 mr-4">
            <LuBaggageClaim className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Products Available
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {totalProducts}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-yellow-500 mr-4">
            <FaRegCalendarAlt className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Last Movement
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {transactions.length > 0
                ? new Date(
                    transactions[transactions.length - 1].transactionDate
                  ).toLocaleDateString()
                : "No movements"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Statistics };
