import React, { useState } from "react";
import { toDollar } from "../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, updateOrder } from "../store/reducers/orderSlice";

function Card(props) {
  const { id, image, title, price } = props;
  const orderItems = useSelector((state) => state.order.dataOrder);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({ [id]: 1 });

  const incrementQty = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const decrementQty = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const handleOrder = () => {
    const qty = quantities[id];
    const index = orderItems.findIndex((item) => item.product_id === id);
    if (index !== -1) {
      const updatedItem = {
        ...orderItems[index],
        quantity: orderItems[index].quantity + qty,
        product_id: parseInt(orderItems[index].product_id),
      };
      dispatch(updateOrder(updatedItem));
    } else {
      const payload = {
        product_id: id,
        image: image,
        title: title,
        price: price,
        quantity: qty,
      };
      dispatch(addToOrder(payload));
    }
  };

  return (
    <div key={id} className="product-item hover:opacity-80 hover:bg-gray-100">
      <span className="flex justify-center items-center m-2">
        <img
          src={image}
          alt={title}
          onClick={handleOrder}
          className="w-[150px] rounded"
        />
      </span>
      <h3>{title}</h3>
      <div className="flex justify-between">
        <p>{toDollar(price)}</p>
        <div className="flex items-center space-x-2">
          <button
            className="bg-teal-400 text-white text-[10px] px-2 py-1 rounded transition duration-300 hover:bg-teal-400 focus:ring"
            onClick={() => decrementQty(id)}
          >
            −
          </button>
          <input
            type="number"
            className="text-[10px] rounded border border-teal-400 px-2 py-1 w-10 text-center focus:outline-none"
            name="qty"
            value={quantities[id]}
            disabled
          />
          <button
            className="bg-teal-400 text-white text-[10px] px-2 py-1 rounded transition duration-300 hover:bg-teal-400 focus:ring"
            onClick={() => incrementQty(id)}
          >
            +
          </button>
          <button
            className="bg-yellow-500 text-white text-[10px] px-2 py-1 rounded transition duration-300 hover:bg-teal-600 focus:ring"
            onClick={handleOrder}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
