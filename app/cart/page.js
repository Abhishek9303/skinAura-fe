"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Product from "../components/product/Product";
import withAuth from "@/store/user/userProtectionRoute";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CheckoutModal from "../../app/components/checkoutModel/CheckoutModal";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { RiShoppingBagLine, RiArrowRightLine } from "@remixicon/react";

const Page = () => {
  const [token, setToken] = useState("");
  const [cartId, setCartId] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [storedProductData, setStoredProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

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
      await axios.put(
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
            "auth-token": token,
          },
        }
      );
      if (response.data.success) {
        setStoredProductData(
          (prevData) => prevData.filter((product) => product._id !== productId)
        );
        toast({
          title: "Success",
          description: "Product removed from cart successfully",
        });
      }
    } catch (error) {
      console.error("Failed to remove product from cart", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove product from cart",
      });
    } finally {
      getCartProducts(token);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[85vh] relative px-4 md:px-0">
      {loading ? (
        <div className="w-full max-w-[85vmax] py-10 px-5 space-y-4">
           <Skeleton height={150} count={3} />
        </div>
      ) : (
        <>
          {storedProductData.length > 0 ? (
            <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
              <div className="w-full md:w-[80vw] flex justify-between items-center py-6 px-4 md:px-0">
                <h1 className="text-3xl font-juanaMedium text-[#6A4D6F]">Your Selection</h1>
                <Button
                  className="rounded-2xl cursor-pointer bg-[#6A4D6F] hover:bg-[#4b334f] text-white px-10 py-4 font-sans font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-[#6A4D6F]/20"
                  text="Proceed to Checkout"
                  onClick={handleCheckoutClick}
                />
              </div>
              <div className="w-full h-auto py-5 mx-auto p-5 md:w-[85vmax] grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 auto-rows-min pb-20">
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
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6A4D6F]/5 blur-3xl rounded-full scale-150" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-2xl">
                  <RiShoppingBagLine size={64} className="text-[#6A4D6F] opacity-20" />
                </div>
              </div>
              
              <div className="text-center space-y-3 px-6">
                <h2 className="text-4xl md:text-5xl font-juanaBold text-[#6A4D6F]">Your cart is calling.</h2>
                <p className="text-gray-400 font-juanaMedium max-w-md mx-auto leading-relaxed">
                  Discover our curated collection and start your journey towards radiant, healthy skin.
                </p>
              </div>

              <Link href="/products">
                <button className="group relative flex items-center gap-3 bg-[#6A4D6F] hover:bg-[#4b334f] text-white px-10 py-5 rounded-2xl font-sans font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-2xl shadow-[#6A4D6F]/30 active:scale-95">
                  Explore Products
                  <RiArrowRightLine size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
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