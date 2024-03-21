import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrder,
  decrementQuantity,
  incrementQuantity,
  removeFromOrder,
} from "../store/reducers/orderSlice";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toDollar } from "../utils/formatter";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const orderItems = useSelector((state) => state.order.dataOrder);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const incrementQty = (productId) => {
    dispatch(incrementQuantity(productId));
  };
  const handleRemove = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the product from your order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromOrder(productId));
      }
    });
  };
  const decrementQty = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(productId));
    } else {
      handleRemove(productId);
    }
  };

  useEffect(() => {
    const TotalPrice = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotalPrice(TotalPrice);
  }, [orderItems]);

  const placeOrder = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-2 cursor-pointer">
        <div className="flex relative">
          <FontAwesomeIcon
            icon={faRectangleList}
            className="mr-2 mt-2 text-gray-600"
          />
          <h3 className="text-lg">Order</h3>
          {orderItems.length > 0 && (
            <span className="absolute left-[75px] text-xs bg-teal-500 rounded-full text-white ">
              <div className="flex items-center justify-center w-4 h-4 ">
                {orderItems.length}
              </div>
            </span>
          )}
        </div>
        <span
          className="text-gray-500 rounded hover:bg-teal-200 px-2"
          onClick={() => dispatch(clearOrder())}
        >
          clear all
        </span>
      </div>
      <div className="grid grid-cols-1">
        {orderItems.map((item) => (
          <div
            className="flex justify-between product-item mb-1 "
            key={item.product_id}
          >
            <div className="flex">
              <img
                src={item.image}
                alt={item.title}
                className="w-[60px] mr-2"
              />

              <div className="flex flex-col justify-between mr-4">
                <span className="text-xs mr-4 mb-2">{item.title}</span>
                <span className="text-xs">{toDollar(item.price)}</span>
                <div className="flex items-center space-x-1 mb-2">
                  <button
                    className="bg-teal-400 text-white text-[8px] px-[5px] py-[3px] rounded transition duration-300 hover:bg-teal-400 focus:ring hover:opacity-70"
                    onClick={() => decrementQty(item.product_id, item.quantity)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="text-[8px] rounded border border-teal-400 px-[6px] py-[3px] w-10 text-center focus:outline-none"
                    name="qty"
                    value={item.quantity}
                    disabled
                  />
                  <button
                    className="bg-teal-400 text-white text-[8px] px-[5px] py-[3px] rounded transition duration-300 hover:bg-teal-400 focus:ring hover:opacity-70"
                    onClick={() => incrementQty(item.product_id)}
                  >
                    +
                  </button>

                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-gray-400 cursor-pointer p-2 text-sm rounded hover:bg-gray-100 "
                    onClick={() => handleRemove(item.product_id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-teal-400 mt-2 p-2 rounded shadow-md text-xs my-4">
        <p>Total : {toDollar(totalPrice)}</p>
        <div className="flex justify-between mr-2 cursor-pointer my-2">
          <p className="p-2 rounded hover:bg-teal-200 text-gray-500">Cash</p>
          <p className="p-2 rounded hover:bg-teal-200 text-gray-500">
            Transfer
          </p>
          <p className="p-2 rounded hover:bg-teal-200 text-gray-500">
            E-Wallet
          </p>
        </div>
        <button
          className="p-2 rounded bg-teal-100 text-teal-500 w-full hover:bg-teal-200"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default OrderList;
