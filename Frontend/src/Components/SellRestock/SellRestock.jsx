import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function SellRestock() {
  const { products, updateQuantity } = useContext(ProductContext);

  const [updatedProducts, setUpdatedProducts] = useState(products);

  const [updateList, setUpdateList] = useState([]);

  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  const handlePlus = (id) => {
    const updateProductsNew = updatedProducts.map((product) => {
      if (product.productId === id) {
        return {
          ...product,
          availableQuantity: product.availableQuantity + 10,
        };
      }

      return product;
    });

    setUpdatedProducts(updateProductsNew);
  };

  const handleMinus = (id) => {
    const updateProductsNew = updatedProducts.map((product) => {
      if (product.productId === id && product.availableQuantity > 10) {
        return {
          ...product,
          availableQuantity: product.availableQuantity - 10,
        };
      }

      return product;
    });

    setUpdatedProducts(updateProductsNew);
  };

  const handleUpdate = async () => {
    const newList = updatedProducts
      .filter((product) => {
        const oldProduct = products.find(
          (oldProduct) => oldProduct.productId === product.productId
        );

        return oldProduct.availableQuantity !== product.availableQuantity;
      })
      .map((product) => {
        return {
          productId: Number(product.productId),
          quantity: product.availableQuantity,
        };
      });

    // setUpdateList(newList);
    console.log(newList);

    try {
      await updateQuantity(newList);
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="-mt-5 pb-5 w-full flex justify-center items-center">
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
      <div className="w-80">
        {updatedProducts.length > 0 &&
          updatedProducts.map((product) => (
            <div
              key={product.productId}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-5"
            >
              <div className="flex items-center">
                <div className="flex flex-col ml-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-black">
                    {product.name}
                  </span>
                  <span className="text-xs font-normal text-black-500 dark:text-gray-400">
                    {product.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex gap-2 items-center justify-between ml-3">
                  <button
                    onClick={() => handleMinus(product.productId)}
                    className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex justify-center items-center"
                  >
                    <FaMinus className="text-white text-xs" />
                  </button>
                  <span className="text-sm font-medium text-gray-900 dark:text-black">
                    {product.availableQuantity}
                  </span>
                  <button
                    onClick={() => handlePlus(product.productId)}
                    className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-600 flex justify-center items-center"
                  >
                    <FaPlus className="text-white text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        <div>
          <button
            onClick={() => handleUpdate()}
            className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
          >
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { SellRestock };
