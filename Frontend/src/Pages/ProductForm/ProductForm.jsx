import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RxChevronLeft } from "react-icons/rx";

function ProductForm() {
  const { createProduct, products, user, updateProduct } =
    useContext(ProductContext);

  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const product = products.find(
        (product) => product.productId === Number(id)
      );
      setProduct(product);
      return;
    }

    setProduct({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (!form.get("name")) return toast.error("Name is required");
    if (!form.get("description")) return toast.error("Description is required");
    if (!form.get("price")) return toast.error("Price is required");
    if (!form.get("availableQuantity") && !id)
      return toast.error("Available Quantity is required");

    const data = {};

    if (id) {
      data.name = form.get("name");
      data.description = form.get("description");
      data.price = Number(form.get("price"));
      data.availableQuantity = product.availableQuantity;
    } else {
      data.name = form.get("name");
      data.description = form.get("description");
      data.price = Number(form.get("price"));
      data.availableQuantity = Number(form.get("availableQuantity"));
      data.userId = user.userId;
    }

    try {
      id ? await updateProduct(id, data) : await createProduct(data);
      const message = id
        ? "Product updated successfully"
        : "Product created successfully";
      toast.success(message);
    } catch (error) {
      console.log(error);
      const message = id ? "Product update failed" : "Product creation failed";
      toast.error(message);
    }

    e.target.reset();
  };

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
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
      <div className="w-80 flex items-center justify-between py-5">
        <Link to={"/products"}>
          <RxChevronLeft className="hover:scale-125 hover:font-bold" />
        </Link>
        <h1 className="font-bold text-2xl">
          {id ? "Edit Product" : "Create Product"}
        </h1>
        <span></span>
      </div>

      <div className="w-80 p-5 border-black border rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              type="text"
              name="name"
              defaultValue={product?.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows="3"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 resize-none"
                defaultValue={product?.description}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              className={`mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              type="number"
              name="price"
              defaultValue={product?.price}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="availableQuantity">Available Quantity</label>
            <input
              className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:bg-gray-300"
              type="number"
              name="availableQuantity"
              defaultValue={product?.availableQuantity}
              disabled={id ? true : false}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
          >
            <span>{id ? "Update" : "Create"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export { ProductForm };
