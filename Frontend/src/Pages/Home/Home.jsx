import { Banner } from "../../Components/Banner/Banner";
import { Statistics } from "../../Components/Statistics/Statistics";

function Home() {
  return (
    <>
      <Banner text="Dashboard" />

      <div className="p-5">
        <Statistics />
      </div>
    </>
  );
}

export { Home };
