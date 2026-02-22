"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios if you haven't
import { useRouter } from "next/navigation"; // Import useRouter
import HomeSwiper1 from "../components/swiper/HomeSwiper1";
import Product from "../components/product/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const router = useRouter(); // Initialize useRouter
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // State to hold all products

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(
          `${process.env.BACKEND_URL}api/v1/common/getProduct`
        );
        if (res.data.success && Array.isArray(res.data.data)) {
          setProducts(res.data.data); // Set products from the response
        } else {
          console.error("Invalid response structure or no data available");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleProductClick = (productId) => {
    router.push(`/product?productId=${productId}`); // Redirect to the product details page
  };

  return (
    <>
      <HomeSwiper1 />
      <div className="w-full">
        <div className="text-center py-5 mb-8">
          <h1 className="md:text-[3vmax] mt-8 text-[3.5vmax] font-juanaRegular">
            Product For
          </h1>
          <p>“Healthy & Beautiful”</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 md:pb-16 pb-8">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-[2.5rem] overflow-hidden p-4 bg-white border border-gray-50">
                  <Skeleton height={350} className="rounded-3xl" />
                  <div className="mt-4 space-y-2">
                    <Skeleton height={24} width="70%" />
                    <Skeleton height={16} width="40%" />
                    <Skeleton height={40} className="rounded-2xl mt-4" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            products.map((product) => (
              <Product
                id={product._id}
                productId={product._id}
                key={product._id}
                name={product.name}
                imgSrc={product.images[0]} 
                price={product.price}
                description={product.description}
                onClick={() => handleProductClick(product._id)} 
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
