import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { UsersTable } from "../../Components/UsersTable/UsersTable";

function Users() {
  const { users } = useContext(ProductContext);

  console.log(users);

  return (
    <div>
      <UsersTable />
    </div>
  );
}

export { Users };
