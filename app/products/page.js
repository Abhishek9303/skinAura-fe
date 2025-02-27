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

        <div className="md:w-[85vmax] w-full px-2 mx-auto flex flex-wrap md:gap-8 gap-5 items-start justify-center md:pb-16 pb-8">
          {loading ? (
            <>
              <Skeleton height={500} width={350} />
              <Skeleton height={500} width={350} />
              <Skeleton height={500} width={350} />
            </>
          ) : (
            products.map((product) => (
              <Product
                id={product._id}
                productId={product._id}
                key={product._id}
                name={product.name}
                imgSrc={product.images[0]} // Assuming images is an array
                price={product.price}
                description={product.description}
                onClick={() => handleProductClick(product._id)} // Use the handleProductClick function for redirection
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
