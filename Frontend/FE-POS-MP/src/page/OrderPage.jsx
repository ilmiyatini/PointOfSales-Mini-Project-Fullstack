import React from "react";
import Titlebar from "../layout/Titlebar";
import ProductList from "../layout/ProductList";
import OrderList from "../layout/OrderList";

function OrderPage() {
  return (
    <div className="flex flex-col">
      <Titlebar />
      <div className="grid grid-cols-[1fr] lg:grid-cols-[5fr,2fr]">
        <ProductList className="col-span-2" />
        <div className="rounded shadow-md m-2 p-8 border " id="orderList">
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
