import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toDollar } from "../utils/formatter";

function DetailProduct() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/detailproduct/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-10 rounded bg-teal-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link to={`/products`} className="text-teal-500 hover:text-teal-700">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </Link>
        <Link to="/" className="text-teal-500 hover:text-teal-700">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </Link>
      </div>
      <div className="border-y-2 border-teal-400 mb-5 ">
        <h1 className="py-2 font-b text-lg text-gray-700">Detail Product </h1>
      </div>

      <div className="flex justify-around text-gray-700 ">
        <div>
          <p className="text-sm  my-4">Product ID</p>{" "}
          <p className="text-sm  my-4">Product Name</p>
          <p className="text-sm  my-4">Unit Price</p>
          <p className="text-sm  my-4">Category ID</p>
          <p className="text-sm  my-4">Category Name</p>
        </div>
        <div>
          <p className="text-sm  my-4">: {data.id}</p>{" "}
          <p className="text-sm  my-4">: {data.title}</p>
          <p className="text-sm  my-4">: {toDollar(data.price)}</p>
          <p className="text-sm  my-4">: {data.category_id}</p>
          <p className="text-sm  my-4">: {data.category_name}</p>
        </div>
        <img src={data.image} className="rounded " />
      </div>
    </div>
  );
}

export default DetailProduct;
