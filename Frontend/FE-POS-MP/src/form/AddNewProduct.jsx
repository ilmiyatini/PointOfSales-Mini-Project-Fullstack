import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function AddNewProduct() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pos/api/categories/listcategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product Name is required"),
    price: Yup.number().required("Price is required"),
    images: Yup.string().required("URL is required"),
    category: Yup.string().required("Category is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data, e) => {
    try {
      const selectedCategory = categories.find(
        (category) => category.name === data.category
      );
      const category_id = selectedCategory.id;
      const payload = {
        title: data.name,
        image: data.images,
        price: data.price,
        category_id: category_id,
      };
      const postResponse = await axios.post(
        "http://localhost:8080/pos/api/add",
        payload
      );

      if (postResponse.status >= 200 && postResponse.status < 300) {
        console.log("Product added successfully!");
        console.log("Submitted data:", JSON.stringify(payload, null, 2));
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        setSelectedImages([]);
      } else {
        console.error("Error adding product:", postResponse.statusText);
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          text: "Error adding product. Please try again.",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleImageChange = (e) => {
    const imageUrls = e.target.value.split(" ");
    setSelectedImages(imageUrls);
  };

  return (
    <div className="bg-teal-100 min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-teal-50 shadow-md rounded-lg px-12 py-16 w-full ">
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
        <h1 className="text-center text-2xl font-bold mb-8 text-teal-500 p-2 bg-teal-100 rounded">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-teal-400 text-sm font-bold mb-2"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              className="border-2 w-full focus:outline-none focus:border-teal-300 rounded px-2 py-1"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-teal-400 text-sm font-bold mb-2"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              className="border-2 w-full focus:outline-none focus:border-teal-300 rounded px-2 py-1"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-teal-400 text-sm font-bold mb-2"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="images"
              className="border-2 w-full focus:outline-none focus:border-teal-300 rounded px-2 py-1"
              {...register("images")}
              onChange={handleImageChange}
            />
            {errors.images && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.images.message}
              </p>
            )}
            <div className="flex mt-2">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="w-20 h-20 object-cover mr-2"
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-teal-400 text-sm font-bold mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              className="border-2 w-full focus:outline-none focus:border-teal-300 rounded p-2 text-gray-500"
              {...register("category")}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-300 hover:bg-teal-100 text-white hover:text-teal-300 font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewProduct;
