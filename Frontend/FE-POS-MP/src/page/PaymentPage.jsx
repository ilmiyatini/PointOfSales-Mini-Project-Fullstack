import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearOrder,
  decrementQuantity,
  incrementQuantity,
  removeFromOrder,
} from "../store/reducers/orderSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { toDollar } from "../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  amountPaid: yup
    .number()
    .typeError("Amount paid must be a number")
    .required("Amount paid is required")
    .positive("Amount paid must be positive"),
});
function PaymentPage() {
  const orderItems = useSelector((state) => state.order.dataOrder);
  const dispatch = useDispatch();
  const [totalPay, setTotalPay] = useState(0);
  const [change, setChange] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const calculateItemTotal = (item) => {
    return item.quantity * item.price;
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    transactionDetails.forEach((item) => {
      totalAmount += item.subtotal;
    });
    return totalAmount;
  };

  const handleAmountPaidChange = (e) => {
    const amountPaid = parseFloat(e.target.value);
    setTotalPay(amountPaid);
    const totalAmount = calculateTotalAmount();
    const change = amountPaid - totalAmount;
    setChange(change);
  };

  const updateTransactionDetails = () => {
    const newTransactionDetails = orderItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      subtotal: item.quantity * item.price,
    }));
    setTransactionDetails(newTransactionDetails);
  };
  useEffect(() => {
    updateTransactionDetails();
  }, [orderItems]);

  const onSubmit = async () => {
    try {
      const totalAmount = calculateTotalAmount();

      // if (totalPay < totalAmount) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "The amount paid is less than the total price.",
      //   });
      //   return;
      // }

      await axios.post("http://localhost:8080/pos/api/addtransaction", {
        total_amount: totalAmount,
        total_pay: totalPay,
        transaction_details: transactionDetails,
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Purchase successful!",
      });
      dispatch(clearOrder());
      setTotalPay(0);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="mt-8 p-4 bg-teal-100">
      <div className="navigation-buttons my-2 flex space-x-3">
        <Link to="/" className="home-back">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </Link>
      </div>
      <div className="mb-8">
        <h2 className="md:text-lg text-base font-bold mb-2 text-teal-400 border-t-2 border-b-2 border-teal-400 py-2">
          Your Order
        </h2>
        {orderItems.map((item) => (
          <div
            key={item.product_id}
            className="mb-4 border border-teal-400 p-5 "
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-28 rounded-md"
            />
            <p className="mt-2 text-sm md:text-base lg:text-lg font-semibold">
              {item.title}
            </p>
            <p className="text-base mt-2">Price : {toDollar(item.price)}</p>
            <div className="flex flex-col md:flex-row items-center md:space-x-4 mt-2 ">
              <span className="text-base mb-2 md:mb-0">Quantity :</span>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-teal-400 text-white text-xs px-3 py-1 rounded transition duration-300 hover:bg-teal-400 focus:ring"
                  onClick={() => decrementQty(item.product_id, item.quantity)}
                >
                  −
                </button>
                <input
                  type="number"
                  className="text-xs rounded border border-teal-400 px-3 py-1 w-16 text-center focus:outline-none"
                  name="qty"
                  value={item.quantity}
                  disabled
                />
                <button
                  className="bg-teal-400 text-white text-xs px-3 py-1 rounded transition duration-300 hover:bg-teal-400 focus:ring"
                  onClick={() => incrementQty(item.product_id)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-base mt-2">
              Total Price : $ {toDollar(calculateItemTotal(item))}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="flex justify-center text-lg font-bold mb-2 mx-20 md:mx-40  bg-teal-100 text-teal-500 shadow-md border-2 rounded border-teal-400 py-2">
          Payment
        </h2>
        <div className="mx-0 md:mx-40 my-4 text-gray-700 p-20 md:p-40 border border-teal-400 rounded-md shadow-md">
          <div className="flex items-center space-x-4 flex-col  mb-4 md:flex-row md:mb-2 justify-between w-full">
            <span className="text-base text-left">Amount Paid</span>
            <div className="relative">
              <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center">
                $
              </span>
              <input
                type="number"
                inputMode="numeric"
                className="text-xs rounded border border-teal-400 px-9 py-1 w-40 focus:outline-none"
                name="amountPaid"
                {...register("amountPaid")}
                onChange={handleAmountPaidChange}
                value={totalPay}
              />
            </div>
            {errors.amountPaid && (
              <p className="text-red-500 text-xs">
                {errors.amountPaid.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4 flex-col  mb-4 md:flex-row md:mb-2 justify-between w-full">
            <span className="text-base text-left">Total Payment</span>
            <span className="text-base text-right">
              {toDollar(calculateTotalAmount())}
            </span>
          </div>

          <div className="flex items-center space-x-4 flex-col  mb-4 md:flex-row md:mb-2 justify-between w-full">
            <span className="text-base text-left">Change</span>
            <span className="text-base text-right">{toDollar(change)}</span>
          </div>
          <div className="flex items-center space-x-4 justify-center w-full">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={
                totalPay < calculateTotalAmount() || orderItems.length === 0
              }
              className={`bg-teal-500 text-white w-40 px-4 py-2 rounded shadow-md transition duration-300 mt-5 hover:bg-teal-200 hover:text-teal-500 ${
                (totalPay < calculateTotalAmount() ||
                  orderItems.length === 0) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
