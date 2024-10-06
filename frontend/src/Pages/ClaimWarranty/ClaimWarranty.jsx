import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./ClaimWarranty.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ClaimWarranty = () => {
  const [productData, setProductData] = useState({
    productName: "",
    purchaseDate: "",
    warrantyPeriod: "",
    purchaseAddress: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/claim-warranty", { ...productData });
      console.log(res);
      console.log(productData);

      

      if (res.data.EnterAllDetails) {
        toast.error(res.data.EnterAllDetails);
      }
      
      if (res.data.warrantyClaimed) {
        toast.error(res.data.warrantyClaimed);
      }
      
      else {
        toast.success("Claimed warranty successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit}>
      <div className={Styles.header}>
        <h2>Claim Warranty</h2>
      </div>

      <div className={Styles.formGroup}>
        <label htmlFor="productname">Product Name:</label>
        <input
          type="text"
          id="productname"
          name="productname"
          value={productData.productname}
          onChange={(e) =>
            setProductData({ ...productData, productname: e.target.value })
          }
        />
        <label htmlFor="purchaseDate">Purchase Date:</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={productData.purchaseDate}
          onChange={(e) =>
            setProductData({ ...productData, purchaseDate: e.target.value })
          }
        />
        <label htmlFor="warrantyPeriod">Warranty Period:</label>
        <input
          type="text"
          id="warrantyPeriod"
          name="warrantyPeriod"
          value={productData.warrantyPeriod}
          onChange={(e) =>
            setProductData({ ...productData, warrantyPeriod: e.target.value })
          }
        />
        <label htmlFor="purchaseAddress">Purchase Address:</label>
        <input
          type="text"
          id="purchaseAddress"
          name="purchaseAddress"
          value={productData.purchaseAddress}
          onChange={(e) =>
            setProductData({ ...productData, purchaseAddress: e.target.value })
          }
        />
      </div>

      <ToastContainer />

      <button className={Styles.button} type="submit">Submit</button>
    </form>
  );
};

export default ClaimWarranty;
