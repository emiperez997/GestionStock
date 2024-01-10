export const getTransactions = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
