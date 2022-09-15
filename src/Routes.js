import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./core/Home/Home";

//components
import Signin from "./User/Signin";
import Signup from "./User/Signup";

const RouterAll = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterAll;
