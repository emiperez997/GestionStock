export const getProducts = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const useCreateProduct = async (product, token) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

export const useUpdateProduct = async (id, product, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }
  );
  const data = await response.json();
  return data;
};

export const useUpdateQuantity = async (quantity, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/products/update-quantity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quantity),
    }
  );
  const data = await response.json();
  return data;
};

export const useDeleteProduct = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
