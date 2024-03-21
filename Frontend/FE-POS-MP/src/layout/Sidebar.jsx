import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faGear,
  faHome,
  faMoneyBill,
  faPlus,
  faRightFromBracket,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const scrollToOrderList = () => {
    const orderListElement = document.getElementById("orderList");
    if (orderListElement) {
      orderListElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="side-bar">
      <div className="flex justify-center border-b border-b-1">
        <img src="/Logo.png" alt="EatalyFood" className="tool w-18 md:w-20" />
      </div>
      <div className="border-b border-b-1 m-1">
        <div className="tool" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHome} className="mb-1" />
          <span>Home</span>
        </div>

        <div className="tool" onClick={scrollToOrderList}>
          <FontAwesomeIcon icon={faTableList} className="mb-1" />
          <span>Order</span>
        </div>

        <div className="tool" onClick={() => navigate("/transactions")}>
          <FontAwesomeIcon icon={faMoneyBill} className="mb-1" />
          <span>Transaction</span>
        </div>
      </div>
      <div className="border-b border-b-1 p-2 m-1">
        <div
          className="tool justify-center "
          onClick={() => navigate("/products")}
        >
          <FontAwesomeIcon icon={faPlus} className="mb-1" />
          <span>Product</span>
          <span>List</span>
        </div>
        <div className="tool" onClick={() => navigate("/categories")}>
          <FontAwesomeIcon icon={faBarsProgress} className="mb-1" />
          <span>Categories</span>
          <span>List</span>
        </div>
      </div>
      <div>
        <div className="tool">
          <FontAwesomeIcon icon={faGear} className="mb-1" />
          <span>Settings</span>
        </div>
        <div className="tool">
          <FontAwesomeIcon icon={faRightFromBracket} className="mb-1" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
