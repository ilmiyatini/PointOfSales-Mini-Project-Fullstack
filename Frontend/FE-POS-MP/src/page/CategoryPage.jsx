import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/pos/api/categories/listcategory")
      .then((response) => {
        const categoriesWithProductCount = response.data.map((category) => {
          axios
            .get(
              `http://localhost:8080/pos/api/listproduct?category_id=${category.id}`
            )
            .then((res) => {
              const productCount = res.data.length;
              category.productCount = productCount;
              setCategories([...response.data]);
            })
            .catch((error) => {
              console.error("Error fetching product count:", error);
              category.productCount = 0;
            });
          return category;
        });
        setCategories(categoriesWithProductCount);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Category ID",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "name",
      },
      {
        Header: "Quantity Product of categories",
        accessor: (row) => row.productCount || 0,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <Link
              to={`/categories/${row.original.id}`}
              className="bg-cyan-400 hover:bg-cyan-300 text-xs lg:text-sm lg:py-2 lg:px-4 text-white font-bold py-1 px-3 rounded mr-2"
            >
              Detail
            </Link>
            <Link
              to={`/categories/edit/${row.original.id}`}
              className="bg-emerald-400 hover:bg-emerald-300 text-xs lg:text-sm lg:py-2 lg:px-4 text-white font-bold py-1 px-3 rounded mr-2"
            >
              Edit
            </Link>
            <button
              onClick={() => confirmDeleteProduct(row.original.id)}
              className="bg-red-400 hover:bg-red-300 text-xs lg:text-sm lg:py-2 lg:px-4 text-white font-bold py-1 px-3 rounded mt-2 lg:mt-0"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: categories,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const confirmDeleteProduct = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(categoryId);
      }
    });
  };

  const handleDeleteProduct = (categoryId) => {
    axios
      .delete(`http://localhost:8080/pos/api/categories/delete/${categoryId}`)
      .then(() => {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Product Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          text: "You can't delete a category that has already been linked to products",
        });
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="p-8 bg-teal-100 rounded min-h-screen">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-6 text-teal-400">
          Categories List
        </h1>
        <div className="navigation-buttons mb-4 flex space-x-3">
          <Link to="/" className="home-back">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          className="px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-400"
        />
      </div>
      <Link
        to="/categories/add"
        className="bg-teal-400 hover:bg-teal-300 text-sm text-white font-bold py-2 px-4 rounded mb-4 inline-block"
      >
        Add Categories
      </Link>
      <table className="min-w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 bg-teal-200 text-left"
                >
                  {column.render("Header")}
                  <span className="ml-4 text-teal-400">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faArrowDownWideShort} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowUpWideShort} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-4 flex items-center justify-between">
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{" "}
        </div>
        <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
