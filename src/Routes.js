import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPrivateRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./core/Home/Home";
import Product from "./core/Product/Product";

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
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/product/:productId" exact element={<Product />} />

        {/* Private Route */}
        <Route path="/user/*"  element={<PrivateRoute/>}>
          <Route path="dashboard"  element={<UserDashboard />} />
        </Route>
        {/* End Private Route */}
        
        {/* Admin Private Route */}
        <Route path="/admin/*"  element={<AdminPrivateRoute/>}>
          <Route path="dashboard"  element={<AdminDashboard />} />
        </Route>
        {/* End Admin Private Route */}

      </Routes>
    </BrowserRouter>
  );
};

export default RouterAll;
