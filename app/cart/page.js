"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Product from "../components/product/Product";
import withAuth from "@/store/user/userProtectionRoute";
import axios from "axios";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Modal from "../components/modal/Modal"; // Import the modal component

const Page = (props) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const getCartProducts = async (authToken) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/common/getCartValues`,
        headers: {
          "auth-token": authToken,
        },
      };
      const res = await axios.request(config);
      if (res.data.success) {
        setCartProducts(res.data.data.products);
      } else {
        setCartProducts([]); // Set to an empty array if no products are returned
      }
    } catch (error) {
      console.log("error", error);
      setCartProducts([]); // Set to empty array in case of an error
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);
    if (authToken) {
      getCartProducts(authToken);
    } else {
      setLoading(false); // Stop loading if there is no token
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] relative">
      {loading ? (
        // Skeleton loading state
        <div className="w-full flex flex-col items-center py-5">
          <Skeleton height={40} width={150} className="mb-4" />
          <Skeleton height={30} width={`80vw`} className="mb-5" />
          <div className="w-full grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} height={200} className="w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {cartProducts.length > 0 ? (
            <>
              <div>
                {cartProducts.length > 0 && (
                  // Show Checkout button only when products are in the cart
                  <div className="w-[80vw] flex justify-end items-center">
                    <Button
                      className="rounded-lg cursor-pointer"
                      text="Checkout"
                      onClick={() => setModalOpen(true)} // Open modal on click
                    />
                  </div>
                )}
              </div>
              <div
                className="w-full h-auto py-5 mx-auto p-5 md:w-[85vmax] grid grid-cols-1 gap-5 
              lg:grid-cols-2 xl:grid-cols-3 auto-rows-min"
              >
                {cartProducts.map((product) => (
                  <Product
                    key={product._id}
                    items={product.quantity}
                    removeProduct={true}
                    {...product}
                  />
                ))}
              </div>
            </>
          ) : (
            // Centered message and button when no products are found
            <div className="flex flex-col items-center justify-center w-full min-h-[80vh]">
              <h2 className="text-center mb-4">
                No Products Found. Please add a product to the cart.
              </h2>
              <Button
                className="rounded-lg"
                text="Browse Products"
                onClick={() => router.push("/products")}
              />
            </div>
          )}
        </>
      )}
      {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />{" "} */}
      {/* Modal Component */}
    </div>
  );
};

export default withAuth(Page);
