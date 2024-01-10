import { Link } from "react-router-dom";
import { Banner } from "../../Components/Banner/Banner";
import { SellRestock } from "../../Components/SellRestock/SellRestock";
import { RxChevronLeft } from "react-icons/rx";

function SellRestockPage() {
  return (
    <div className="w-full py-10 flex flex-col items-center ">
      <div className="w-80 flex items-center justify-between pb-10 pt-10">
        <Link to={"/products"}>
          <RxChevronLeft className="hover:scale-125 hover:font-bold" />
        </Link>
        <h1 className="font-bold text-2xl">Sell or Restock</h1>
      </div>

      <SellRestock />
    </div>
  );
}

export { SellRestockPage };
