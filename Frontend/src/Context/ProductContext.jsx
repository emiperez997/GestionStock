import { createContext, useEffect, useState } from "react";
import {
  getProducts,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
  useUpdateQuantity,
} from "../Utils/useProducts";
import { getTransactions } from "../Utils/useTransactions";
import Storage from "../Utils/Storage";
import {
  fetchLogin,
  getCurrent,
  getUsers,
  useActivateUser,
  useCreateUser,
  useDeactivateUser,
  useDeleteUser,
  useUpdateUser,
} from "../Utils/useAuth";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [modalContent, setModalContent] = useState({});

  const [token, setToken] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Storage.get("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setToken(token);
      setIsAuthenticated(true);
      setLoading(false);

      try {
        const products = await getProducts(token);
        const transactions = await getTransactions(token);
        const userDB = await getCurrent(token);

        setUser(userDB);
        setProducts(products);
        setTransactions(transactions);

        if (userDB.userRole === "Admin") {
          const users = await getUsers(token);
          setUsers(users);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        Storage.remove("token");
      }
    };

    fetchData();
  }, []);

  const createProduct = (product) => {
    useCreateProduct(product, token)
      .then((data) => {
        setProducts([...products, data]);

        getTransactions(token).then((data) => {
          setTransactions(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = (id, product) => {
    useUpdateProduct(id, product, token)
      .then((data) => {
        console.log(data);

        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    useDeleteProduct(id)
      .then((data) => {
        const updatedProducts = products.filter(
          (product) => product.productId !== Number(id)
        );

        setProducts(updatedProducts);

        getTransactions().then((data) => {
          setTransactions(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const openCreateModal = () => {
    setOpenModal(true);
  };

  const login = async (email, password) => {
    const user = {
      email,
      password,
    };

    const response = await fetchLogin(user);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    Storage.set("token", data.token);
    setToken(data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Storage.remove("token");
    setToken("");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateQuantity = (quantity) => {
    useUpdateQuantity(quantity, token)
      .then((data) => {
        console.log(data);
        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // User operations
  const createUser = (user) => {
    useCreateUser(user, token)
      .then((data) => {
        setUsers([...users, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = (id, user) => {
    useUpdateUser(id, user, token)
      .then((data) => {
        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });

        getUsers(token).then((data) => {
          setUsers(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id) => {
    useDeleteUser(id, token)
      .then((data) => {
        getUsers(token).then((data) => {
          setUsers(data);
        });

        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activateUser = (email) => {
    useActivateUser(email, token)
      .then((data) => {
        console.log(data);
        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });

        getUsers(token).then((data) => {
          setUsers(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deactivateUser = (email) => {
    useDeactivateUser(email, token)
      .then((data) => {
        console.log(data);
        getProducts(token).then((data) => {
          setProducts(data);
        });

        getTransactions(token).then((data) => {
          setTransactions(data);
        });

        getUsers(token).then((data) => {
          setUsers(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        createProduct,
        transactions,
        updateProduct,
        deleteProduct,
        loading,
        openModal,
        closeModal,
        openCreateModal,
        updateQuantity,
        modalContent,
        setModalContent,
        isAuthenticated,
        token,
        login,
        logout,
        user,
        users,
        createUser,
        updateUser,
        deleteUser,
        activateUser,
        deactivateUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
