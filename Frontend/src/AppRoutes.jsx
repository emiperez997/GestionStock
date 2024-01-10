import { Navigate, useRoutes } from "react-router-dom";
import { Banner } from "./Components/Banner/Banner";
import { Home } from "./Pages/Home/Home";
import { Transactions } from "./Pages/Transactions/Transactions";
import { Products } from "./Pages/Products/Products";
import { ProductPage } from "./Pages/ProductPage/ProductPage";
import { useContext } from "react";
import { ProductContext } from "./Context/ProductContext";
import { Login } from "./Pages/Login/Login";
import { Users } from "./Pages/Users/Users";
import { SellRestockPage } from "./Pages/SellRestock/SellRestockPage";
import { UserForm } from "./Pages/UserForm/UserForm";
import { ProductForm } from "./Pages/ProductForm/ProductForm";

function AppRoutes() {
  const { isAuthenticated, user } = useContext(ProductContext);

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to={"/login"} />,
    },
    {
      path: "/products",
      element: isAuthenticated ? <Products /> : <Navigate to={"/login"} />,
    },
    {
      path: "/products/create",
      element: isAuthenticated ? <ProductForm /> : <Navigate to={"/login"} />,
    },
    {
      path: "/products/:id",
      element: isAuthenticated ? <ProductPage /> : <Navigate to={"/login"} />,
    },
    {
      path: "/products/edit/:id",
      element: isAuthenticated ? <ProductForm /> : <Navigate to={"/login"} />,
    },
    {
      path: "/products/sell-restock",
      element: isAuthenticated ? (
        <SellRestockPage />
      ) : (
        <Navigate to={"/login"} />
      ),
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "/transactions",
      element: isAuthenticated ? <Transactions /> : <Navigate to={"/login"} />,
    },
    {
      path: "/users",
      element:
        isAuthenticated && user && user.userRole === "Admin" ? (
          <Users />
        ) : (
          <Navigate to={"/login"} />
        ),
    },
    {
      path: "/users/edit/:id",
      element:
        isAuthenticated && user && user.userRole === "Admin" ? (
          <UserForm />
        ) : (
          <Navigate to={"/login"} />
        ),
    },
    {
      path: "/users/create",
      element:
        isAuthenticated && user && user.userRole === "Admin" ? (
          <UserForm />
        ) : (
          <Navigate to={"/login"} />
        ),
    },
    {
      path: "*",
      element: <Banner text="404" />,
    },
  ]);

  return routes;
}

export { AppRoutes };
