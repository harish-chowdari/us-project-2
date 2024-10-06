import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import QrCodeScanner from "./Pages/Qr/Qr";
import Product from "./Pages/Product/Product";
import Navbar from "./Layout/Navbar/Navbar";
import ClaimWarranty from "./Pages/ClaimWarranty/ClaimWarranty";


const App = () => {

  const userId = localStorage.getItem("userId");

  return (
    <div>
    <BrowserRouter>
    {userId ? <Navbar/>:<></>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/reset" element= {<PasswordReset/>} />
        <Route path="/home/:userId" element={<QrCodeScanner />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/claim/:productId"  element={<ClaimWarranty />} />
      </Routes>
    </BrowserRouter>
      
      
    </div>
  );
};

export default App;
