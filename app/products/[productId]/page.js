"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "@/app/components/product/Product";
import ProductImages from "@/app/components/swiper/ProductImages";
import ReviewSwiper from "@/app/components/swiper/ReviewSwiper";
import VideoDiv from "@/app/components/videoDiv/VideoDiv"; // Correct the import path if necessary
import Button from "@/app/components/button/Button";
import QuantityBtn from "@/app/components/quantityBtn/QuantityBtn";
import { useParams } from "next/navigation";
import PaymentModal from "@/app/components/payment/PaymentModal"; // Import the PaymentModal component
import AddressModal from "@/app/components/addressModal/AddressModal";
import withAuth from "@/store/user/userProtectionRoute";
import useUserStore from "../../../store/user/userProfile";
import useAddToCart from "@/app/components/hooks/useAddToCart";

const SingleProduct = () => {
  const { user } = useUserStore();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { addToCart, loading, error, response } = useAddToCart();

  const handleAddToCart = () => {
    addToCart([{ productId, quantity }]);
  };

  const fetchProductData = async (productId) => {
    if (!productId) {
      console.error("Product ID is not defined");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getProduct`
      );
      if (res.data.success && Array.isArray(res.data.data)) {
        const product = res.data.data.find(
          (product) => product._id === productId
        );
        if (product) {
          setProductData(product);
        } else {
          console.error(`Product with ID ${productId} not found`);
        }
        const allProducts = res.data.data.filter(
          (product) => product._id !== productId
        );
        setOtherProducts(allProducts);
      } else {
        console.error("Invalid response structure or no data available");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData(productId);
  }, [productId]);

  // Increment and decrement functions
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleBuyNow = () => {
    setIsAddressModalOpen(true); // Open address modal first
  };

  const handleAddressSave = (addressData) => {
    setSelectedAddress(addressData); // Set the selected address
    setIsAddressModalOpen(false); // Close the AddressModal
    setIsModalOpen(true); // Open the PaymentModal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPaymentMethod(""); // Reset the payment method when closing
  };

  return (
    <>
      <div className="md:w-[85vmax] w-full px-5 min-h-screen mx-auto">
        {/* Product Details */}
        <div className="flex lg:flex-row flex-col md:py-10 py-8 items-center justify-center">
          <div className="lg:w-[35vw] w-[80vw] lg:h-[40vh] h-[40vh]">
            <ProductImages height={"50vh"} />
          </div>
          <div className="md:ml-16 lg:w-[45vw] md:w-[80vw] lg:h-[40vh] md:h-[28vh] h-auto w-full lg:px-10 p-5 lg:py-5 md:py-16">
            <h1 className="md:text-4xl text-[3vmax] mb-3 font-medium">
              {productData?.name || "Skin Aura’s Glglow Cream-UNISEX"}
            </h1>
            <p className="md:text-sm text-[1.8vmax]">
              53 people ordered last week
            </p>
            <div>*****</div>
            <h5 className="lg:text-base py-2 text-[1.8vmax]">
              {productData?.description || "Description of the product"}
            </h5>
            <div className="flex items-start lg:w-[36vmax] mt-2 justify-between">
              <h1 className="md:text-3xl text-[3vmax] mt-4 font-bold">
                MRP : ₹ {productData?.price} /-
              </h1>
              <QuantityBtn
                quantity={quantity}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </div>
            <div className="flex items-center md:py-10 pt-10 gap-5">
              <Button
                text={loading ? "Adding..." : "Add To Cart"}
                className="rounded-lg"
                onClick={handleAddToCart}
              />
              <Button
                text="Buy Now"
                onClick={handleBuyNow}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="flex lg:flex-row flex-col mx-auto lg:text-left text-center w-[80vw] lg:py-10 items-center justify-between">
          <div className="lg:w-[40vw] w-[80vw]">
            <h1 className="md:text-xl text-[3vmax] py-2 lg:text-left text-center">
              Skin Cream that prevents aging wrinkles and improves skin health
            </h1>
            <p className="py-4 md:text-sm text-[1.8vmax] lg:text-left text-justify">
              Nourishes skin internally with essential supplements with a dosha
              imbalance, and poor blood flow. Inadequate sleep, diet, and
              lifestyle can cause an imbalance of hormones. Adaptogenic herbs in
              skin ras such as bhringraj, shatavari, and ashwagandha help
              restore that. Made with proven, safe, and natural ingredients,
              these Ayurvedic multivitamin tablets help promote skin health.
            </p>
          </div>
          <div>
            <img
              className="lg:w-[20vw] w-[70vw] md:py-12 py-5"
              src="/images/newImage.png"
              alt="Product"
            />
          </div>
        </div>

        {/* Certified Products Section */}
        <div className="md:py-12 py-8">
          <h1 className="md:text-[3vmax] text-[4vmax] font-juanaRegular md:mb-12 mb-8 text-center">
            Certified Products
          </h1>
          <VideoDiv
            text="Certificates"
            imgSrc="https://plus.unsplash.com/premium_photo-1713628398440-9d056ad0d468?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        {/* Product Results Section */}
        <div className="py-10 mx-auto">
          <h1 className="text-center md:text-[3vmax] text-[4vmax] font-juanaRegular">
            Our Product Results
          </h1>
          <p className="md:text-sm text-[1.8vmax] mb-8 text-center">
            We don’t say it, our members say it
          </p>
          <div className="md:py-10 flex items-center justify-center">
            <ReviewSwiper perPage={"3"} />
          </div>
        </div>

        {/* Suggested Products Section */}
        <div className="w-full">
          <div className="text-center mb-8">
            <h1 className="md:text-[3vmax] mt-8 text-[4vmax] font-juanaRegular">
              Suggested Ones
            </h1>
            <p className="md:text-sm text-[1.8vmax]">“Healthy & Beautiful”</p>
          </div>
          {otherProducts.length > 0 && (
            <div className="md:w-[85vmax] w-full px-2 mx-auto flex flex-wrap md:gap-8 gap-5 items-center justify-center md:pb-16 pb-8">
              {otherProducts.map((product) => (
                <Product
                  id={product._id}
                  productId={product._id}
                  key={product._id}
                  name={product.name}
                  imgSrc={product.images[0]} // Assuming images is an array
                  price={product.price}
                  description={product.description}
                  onClick={() =>
                    console.log(`Clicked product: ${product.name}`)
                  } // Implement your click handler
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSave}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        productId={productId}
        quantity={quantity}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        selectedAddress={selectedAddress}
      />
    </>
  );
};

export default withAuth(SingleProduct);
