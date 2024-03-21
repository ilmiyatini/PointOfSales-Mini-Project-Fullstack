import React from "react";
import OrderPage from "./OrderPage";
import Sidebar from "../layout/Sidebar";

function Home() {
  return (
    <div className="flex">
      <div className="w-14 md:w-20 bg-teal-300 fixed h-full">
        <Sidebar />
      </div>
      <div className="ml-10 md:ml-20">
        <OrderPage />
      </div>
    </div>
  );
}

export default Home;
