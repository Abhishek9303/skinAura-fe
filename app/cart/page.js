"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Product from "../components/product/Product";
import withAuth from "@/store/user/userProtectionRoute";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CheckoutModal from "../../app/components/checkoutModel/CheckoutModal";
import { toast } from "react-toastify";
import Link from "next/navigation";

const Page = () => {
  const [token, setToken] = useState("");
  const [cartId, setCartId] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [storedProductData, setStoredProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const getCartProducts = async (authToken) => {
    try {
      const config = {
        method: "get",
        url: `${process.env.BACKEND_URL}api/v1/common/getCartValues`,
        headers: {
          "auth-token": authToken,
        },
      };
      const res = await axios.request(config);
      if (res.data.success) {
        setCartProducts(res.data.data.products);
        setCartId(res.data.data._id);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.log("error", error);
      setCartProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProductDetails = async (productIds) => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}api/v1/common/getAllCartProducts`,
        { productIds },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (res.data) {
        const productsWithQuantity = res.data.data.map((product) => {
          const cartProduct = cartProducts.find(
            (cart) => cart.product == product._id
          );
          return {
            ...product,
            quantity: cartProduct ? cartProduct.quantity : 1,
          };
        });
        setStoredProductData(productsWithQuantity);
      }
    } catch (error) {
      console.log("Failed to fetch all product details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);
    if (authToken) {
      getCartProducts(authToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      // Check if cartProducts is defined and has length
      const productIds = cartProducts.map((product) => product.product);
      fetchAllProductDetails(productIds);
    } else {
      setLoading(false);
      setStoredProductData([]);
    }
  }, [cartProducts]);

  const handleQuantityChange = async (productId, newQuantity) => {
    setStoredProductData((prevData) =>
      prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );

    await updateCartQuantity(productId, newQuantity);
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_URL}api/v1/common/editCart?cartId=${cartId}`,
        {
          productId,
          quantity,
        },
        { headers: { "auth-token": token } }
      );
  
    } catch (error) {
      console.error("Failed to update quantity in the database", error);
    }
  };

  const handleCheckoutClick = () => {
    setModalOpen(true);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_URL}api/v1/common/editCart?cartId=${cartId}`,
        {
          removeProductId: productId,
        },
        {
          headers: {
            "auth-token": token, // Make sure to include the auth token
          },
        }
      );
      if (response.data.success) {
        setStoredProductData(
          (prevData) => prevData.filter((product) => product._id !== productId) // Update state to remove product
        );
        toast.success("Product removed from cart successfully"); // Success notification
      }
    } catch (error) {
      console.error("Failed to remove product from cart", error);
      toast.error("Failed to remove product from cart");
    } finally {
      getCartProducts(token); // Refresh cart products
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] relative">
      {loading ? (
        <Skeleton count={6} />
      ) : (
        <>
          {storedProductData.length > 0 ? (
            <>
              <div className="w-[80vw] flex justify-end items-center">
                <Button
                  className="rounded-lg cursor-pointer"
                  text="Checkout"
                  onClick={handleCheckoutClick}
                />
              </div>
              <div className="w-full h-auto py-5 mx-auto p-5 md:w-[85vmax] grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {storedProductData.map((product) => (
                  <Product
                    key={product._id}
                    productId={product._id}
                    items={product.quantity}
                    removeProduct={true}
                    onQuantityChange={handleQuantityChange}
                    removeFromCart={handleRemoveFromCart}
                    cartId={cartId}
                    {...product}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No Products Found. Please add a product to the cart.</p>
          )}
        </>
      )}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cartProducts={storedProductData}
        cartId={cartId}
      />
    </div>
  );
};

export default withAuth(Page);