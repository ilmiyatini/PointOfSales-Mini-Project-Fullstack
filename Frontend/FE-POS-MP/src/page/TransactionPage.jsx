import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, toDollar } from "../utils/formatter";
import { Link, useNavigate } from "react-router-dom";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/pos/api/transactionlist")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  const data = React.useMemo(() => transactions, [transactions]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Transaction Date",
        accessor: "transactionDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>,
      },
      {
        Header: "Transaction ID",
        accessor: "id",
      },
      {
        Header: "Total Price",
        accessor: "totalAmount",
        Cell: ({ value }) => toDollar(value),
      },
      {
        Header: "Total Paid",
        accessor: "totalPay",
        Cell: ({ value }) => toDollar(value),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            className="bg-teal-400 hover:bg-teal-300 text-sm text-white font-bold py-2 px-4 rounded"
            onClick={() => handleTransactionDetail(row.original.id)}
          >
            Transaction Detail
          </button>
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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setGlobalFilter(value || undefined);
  };

  const handleTransactionDetail = (transactionId) => {
    navigate(`/transactions/${transactionId}`);
  };

  return (
    <div className="p-8 bg-teal-100 rounded">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-6 text-teal-400">
          Transaction History
        </h1>
        <div className="navigation-buttons mb-4 flex space-x-3">
          <Link to="/" className="home-back">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter || ""}
        onChange={handleSearch}
        className="mb-4 px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-400"
      />
      <div className="overflow-x-auto">
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="py-2 px-4">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-4 flex items-center justify-between">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
        </div>
        <div>
          <span className="ml-4">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <div>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
