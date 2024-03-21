import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { formatDate, toDollar } from "../utils/formatter";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";

function TransactionDetailPage() {
  const { id } = useParams();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/transaction/${id}`
        );
        setTransaction(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction detail:", error);
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/transactiondetail/${id}`
        );
        setTransactionDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction detail:", error);
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pos/api/detailproduct/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (transactionDetail) {
        const detailsWithProducts = await Promise.all(
          transactionDetail.transaction_details.map(async (detail) => {
            const productDetail = await fetchProductDetails(detail.product_id);
            return { ...detail, ...productDetail };
          })
        );

        setTransactionDetail((prevTransaction) => ({
          ...prevTransaction,
          transaction_details: detailsWithProducts,
        }));
      }
    };

    fetchTransactionDetails();
  }, [transactionDetail]);

  if (loading) {
    return <BeatLoader color="teal" />;
  }

  if (!transactionDetail) {
    return <div>Transaction not found!</div>;
  }

  return (
    <div className="m-10">
      <div className="my-2 flex space-x-3">
        <Link to={`/transactions`} className="home-back">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </Link>
        <Link to="/" className="home-back">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </Link>
      </div>
      <div>
        <div className="border-b-2 border-gray-600">
          <h1 className="py-2 text-2xl font-bold mb-4 text-gray-700 ">
            Transaction Detail
          </h1>
        </div>

        <div className="my-10 text-gray-600">
          <p className="text-sm my-3">
            Transaction ID<span className="ml-14">: </span>
            {transaction && transaction.id}
          </p>
          <p className="text-sm my-3">
            Transaction Date<span className="ml-10">: </span>
            {transaction && formatDate(transaction.transactionDate)}
          </p>
          <p className="text-sm my-3">
            Total Price<span className="ml-20">: </span>
            {transaction && toDollar(transaction.totalAmount)}
          </p>
          <p className="text-sm my-3">
            Total Paid<span className="ml-[84px]">: </span>
            {transaction && toDollar(transaction.totalPay)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-600">
                <th className="px-6 py-3 text-left text-sm leading-4 text-gray-600 uppercase font-medium">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-sm leading-4 text-gray-600 uppercase font-medium">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm leading-4 text-gray-600 uppercase font-medium">
                  Product Price
                </th>
                <th className="px-6 py-3 text-left text-sm leading-4 text-gray-600 uppercase font-medium">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm leading-4 text-gray-600 uppercase font-medium">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionDetail.transaction_details.map((detail) => (
                <tr key={detail.product_id} className="text-gray-600">
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    {detail.product_id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    {detail.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    {toDollar(detail.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    {detail.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    {toDollar(detail.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
