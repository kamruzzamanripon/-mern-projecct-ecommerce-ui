import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import AdminPrivateRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Cart from "./core/Cart/Cart";
import Home from "./core/Home/Home";
import Product from "./core/Product/Product";
import Shop from "./core/Shop/Shop";

//components
import AdminDashboard from "./User/AdminDashboard";
import Signin from "./User/Signin";
import Signup from "./User/Signup";
import UserDashboard from "./User/UserDashboard";

const RouterAll = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/product/:productId" exact element={<Product />} />

        {/* Private Route */}
        <Route path="/user/*"  element={<PrivateRoute/>}>
          <Route path="dashboard"  element={<UserDashboard />} />
        </Route>
        {/* End Private Route */}
        
        {/* Admin Private Route */}
        <Route path="/admin/*"  element={<AdminPrivateRoute/>}>
          <Route path="dashboard"  element={<AdminDashboard />} />
          <Route path="create/category"  element={<AddCategory />} />
          <Route path="create/product"  element={<AddProduct />} />
          <Route path="products"  element={<ManageProduct />} />
          <Route path="product/update/:productId"  element={<UpdateProduct />} />
        </Route>
        {/* End Admin Private Route */}

      </Routes>
    </BrowserRouter>
  );
};

export default RouterAll;
