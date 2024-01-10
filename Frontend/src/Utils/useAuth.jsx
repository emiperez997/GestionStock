export const fetchLogin = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    }
  );

  return response;
};

export const getCurrent = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/auth/current`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getUsers = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

export const useCreateUser = async (user, token) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const useUpdateUser = async (id, user, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return data;
};

export const useDeleteUser = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/users/${id}`,
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

export const useActivateUser = async (email, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/users/activate/${email}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const useDeactivateUser = async (email, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/users/deactivate/${email}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
