import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faLayerGroup,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const [isSortHovered, setIsSortHovered] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { data: categories, error: categoryError } = useSWR(
    `http://localhost:8080/pos/api/categories/listcategory`,
    (url) => axios.get(url).then((response) => response.data)
  );

  const getProducts = async (url) => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const params = {
      ...(searchTerm && { title: encodedSearchTerm }),
      ...(sortBy && { sort_by: sortBy }),
      ...(sortOrder && { sort_order: sortOrder }),
      ...(categoryId && { category_id: categoryId }),
    };

    const queryString = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    const fullUrl = `${url}?${queryString}`;
    const response = await axios.get(fullUrl);
    return response.data;
  };
  const { data, isLoading, error, mutate } = useSWR(
    `http://localhost:8080/pos/api/listproduct`,
    getProducts
  );

  try {
    if (error) throw new Error("Gagal memuat data");
  } catch (error) {
    console.error(error.message);
    return <div>Gagal memuat data.</div>;
  }

  const handleSortMouseEnter = () => {
    setIsSortHovered(true);
  };

  const handleSortMouseLeave = () => {
    setIsSortHovered(false);
  };

  const handleCategoryMouseEnter = () => {
    setIsCategoryHovered(true);
  };

  const handleCategoryMouseLeave = () => {
    setIsCategoryHovered(false);
  };

  useEffect(() => {
    if (sortBy && sortOrder) {
      setSelectedCategoryId(
        `${sortBy} (${sortOrder === "asc" ? "Ascending" : "Descending"})`
      );
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    if (categoryId !== null) {
      setSelectedCategoryId(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    mutate();
    try {
      mutate();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedCategoryId]);

  const handleSortOptionClick = (sortBy, sortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const handleAllProductsClick = () => {
    setCategoryId(null);
    setSelectedCategoryId(null);
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleSearch = async () => {
    try {
      mutate();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedDateTime = currentDateTime.toLocaleString();
  const splitDateTime = formattedDateTime.split(",");
  const formattedDate = splitDateTime[0];

  return (
    <div className="flex flex-col">
      <div className="flex mx-10 ">
        <div className="flex items-center justify-center mr-4">
          <div className="relative">
            <input
              type="text"
              className="border border-white bg-teal-100 h-10 w-80 pl-8 rounded-md shadow-md text-sm outline-none focus:border-teal-400"
              placeholder="Enter search keywords."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="absolute left-0  top-2 px-2 "
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} className="text-gray-600 " />
            </button>
          </div>
        </div>
        <div className="relative text-xs lg:text-sm mr-4 ">
          <button
            className="flex items-center py-1 px-2 md:py-2 md:px-4  h-10 bg-teal-100 rounded-md shadow-md transition duration-300 hover:bg-teal-300 focus:outline-none"
            onMouseEnter={handleSortMouseEnter}
            onMouseLeave={handleSortMouseLeave}
          >
            <FontAwesomeIcon icon={faSort} className="mr-2 text-gray-600 " />
            <span className="hidden lg:block text-gray-500">Sort</span>
          </button>
          {isSortHovered && (
            <div
              className="absolute left-5 lg:left-14 mt-0 top-9 w-48 bg-gray-100 rounded-md shadow-lg z-10"
              onMouseEnter={handleSortMouseEnter}
              onMouseLeave={handleSortMouseLeave}
            >
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-teal-100 hover:rounded cursor-pointer"
                  onClick={() => handleSortOptionClick("title", "asc")}
                >
                  Product Name (A-Z)
                </li>
                <li
                  className="px-4 py-2 hover:bg-teal-100 hover:rounded cursor-pointer"
                  onClick={() => handleSortOptionClick("title", "desc")}
                >
                  Product Name (Z-A)
                </li>
                <li
                  className="px-4 py-2 hover:bg-teal-100 hover:rounded cursor-pointer"
                  onClick={() => handleSortOptionClick("price", "asc")}
                >
                  Price (Low to High)
                </li>
                <li
                  className="px-4 py-2 hover:bg-teal-100 hover:rounded cursor-pointer"
                  onClick={() => handleSortOptionClick("price", "desc")}
                >
                  Price (High to low)
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <button className="text-xs mr-4 lg:text-sm text-gray-500 py-1 px-2 md:py-2 md:px-4 h-10 bg-teal-100 rounded-md shadow-md transition duration-300 focus:outline-none flex items-center">
            <FontAwesomeIcon
              icon={faCalendarDay}
              className="mr-2 text-gray-600"
            />
            <span className="hidden lg:block">{formattedDateTime}</span>
            <span className="lg:hidden">{formattedDate}</span>
          </button>
        </div>
        <div>
          <button
            className="block lg:hidden  py-1 px-2 md:py-2 md:px-4  h-10 bg-teal-100 rounded-md shadow-md transition duration-300 hover:bg-teal-300 focus:outline-none"
            onMouseEnter={handleCategoryMouseEnter}
            onMouseLeave={handleCategoryMouseLeave}
          >
            <FontAwesomeIcon
              icon={faLayerGroup}
              className=" mr-2 text-gray-600 "
            />
          </button>
          {isCategoryHovered && (
            <div
              className="absolute w-48 bg-gray-100 rounded-md shadow-lg z-10"
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <ul className="py-1">
                <li>
                  <p
                    className="text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-500 p-2 rounded"
                    onClick={handleAllProductsClick}
                  >
                    All
                  </p>
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer ${
                      selectedCategoryId === category.id
                        ? "bg-teal-100 text-teal-500 rounded"
                        : ""
                    }`}
                  >
                    <p
                      className="text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-500 p-2 rounded"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="ml-10 flex m-4 hidden lg:block">
        {categoryError && <div>Gagal memuat data kategori.</div>}
        {!categories && <div>Memuat...</div>}
        {categories && (
          <div className="flex">
            <div
              className={`cursor-pointer mr-2 ${
                selectedCategoryId === null ? "bg-teal-100 rounded" : ""
              }`}
            >
              <p
                className="text-[10px] md:text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-500 p-2 rounded"
                onClick={handleAllProductsClick}
              >
                All
              </p>
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`cursor-pointer mr-2 ${
                  selectedCategoryId === category.id
                    ? "bg-teal-100 text-teal-500 rounded"
                    : ""
                }`}
              >
                <p
                  className="text-[10px] md:text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-500 p-2 rounded"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mx-10 mt-4 lg:mt-0 mb-2">
        {isLoading ? (
          <BeatLoader color="teal" />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 mx-auto">
            {data.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
