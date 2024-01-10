import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ProductContext } from "../../Context/ProductContext";

function Login() {
  const { login } = useContext(ProductContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return toast.error("Please fill in all fields");

    if (!email.includes("@") || !email.includes(".com"))
      return toast.error("Please enter a valid email");

    try {
      await login(email, password);
      toast.success("Login successful");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <>
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
      <div className="w-full h-5/6 flex flex-col items-center justify-center">
        <div className="bg-gray-700 rounded-lg text-white p-10">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="border border-gray-900 rounded-md p-2 text-black"
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="border border-gray-900 rounded-md p-2 text-black"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="bg-gray-900 text-white rounded-md p-2 mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export { Login };
