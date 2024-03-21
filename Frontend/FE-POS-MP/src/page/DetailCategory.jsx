import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function DetailCategory() {
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pos/api/categories/detailcategory/${id}`
      );
      const categoryData = response.data;
      const res = await axios.get(
        `http://localhost:8080/pos/api/listproduct?category_id=${categoryData.id}`
      );
      categoryData.productCount = res.data.length;
      setCategory(categoryData);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  if (!category) {
    return <BeatLoader color="teal" />;
  }

  return (
    <div className="flex flex-col p-10 rounded bg-teal-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link to={`/categories`} className="text-teal-500 hover:text-teal-700">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </Link>
        <Link to="/" className="text-teal-500 hover:text-teal-700">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </Link>
      </div>
      <div className="border-y-2 border-teal-400 mb-5 ">
        <h1 className="py-2 font-b text-lg text-gray-700">Detail Category </h1>
      </div>

      <div className="flex justify-around text-gray-700 mx-80 ">
        <div>
          <p className="text-sm  my-4">Category ID</p>
          <p className="text-sm  my-4">Category Name</p>
          <p className="text-sm  my-4">Quantity Product of categories</p>
        </div>
        <div>
          <p className="text-sm  my-4">: {category.id}</p>
          <p className="text-sm  my-4">: {category.name}</p>
          <p className="text-sm  my-4">: {category.productCount}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailCategory;
