import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PaymentPage from "./page/PaymentPage";
import TransactionPage from "./page/TransactionPage";
import TransactionDetailPage from "./page/TransactionDetailPage";
import ProductPage from "./page/ProductPage";
import AddNewProduct from "./form/AddNewProduct";
import EditProduct from "./form/EditProduct";
import DetailProduct from "./page/DetailProduct";
import CategoryPage from "./page/CategoryPage";
import AddNewCategory from "./form/AddNewCategory";
import EditCategory from "./form/EditCategory";
import DetailCategory from "./page/DetailCategory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/products/add" element={<AddNewProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/add" element={<AddNewCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />
        <Route path="/categories/:id" element={<DetailCategory />} />
      </Routes>
    </div>
  );
}

export default App;
