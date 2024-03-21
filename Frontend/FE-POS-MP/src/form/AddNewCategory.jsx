import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function AddNewCategory() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product Name is required"),
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
      const payload = {
        name: data.name,
      };
      const postResponse = await axios.post(
        "http://localhost:8080/pos/api/categories/add",
        payload
      );

      if (postResponse.status >= 200 && postResponse.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Category added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      } else {
        console.error("Error adding category:", postResponse.statusText);
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          text: "Error adding category. Please try again.",
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

  return (
    <div className="bg-teal-100 flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-teal-50 shadow-md rounded-lg p-8 w-full max-w-md min-h-screen my-2">
        <div className="flex justify-between items-center mb-6">
          <Link
            to={`/categories`}
            className="text-teal-500 hover:text-teal-700"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Link>
          <Link to="/" className="text-teal-500 hover:text-teal-700">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </div>
        <div>
          <h1 className="text-center text-2xl font-bold mb-8 text-teal-500 p-2 bg-teal-100 rounded ">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-teal-400 text-sm font-bold mb-2"
              >
                Category Name:
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-300 hover:bg-teal-100 text-white hover:text-teal-300 font-bold py-2 px-4 rounded"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCategory;
