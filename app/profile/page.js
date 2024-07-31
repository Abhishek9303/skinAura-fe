'use client'
import React, { useState } from "react";
import UserInfoForm from "../components/userInfoForm/UserInfoForm";
import OrderCard from "../components/orderCard/OrderCard";

const Page = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between lg:h-screen">
      <div className="w-full h-auto rounded-tr-lg rounded-br-lg lg:w-[60%]">
        <div className="flex items-center justify-between p-5 md:px-16">
          <h1 className="text-xl font-bold">Hey! UserName</h1>
          <button 
            className="border-1 bg-[#6A4D6F] text-white md:px-8 px-4 py-2 rounded-lg lg:hidden"
            onClick={toggleFormVisibility}
          >
            Edit Profile
          </button>
        </div>
        {isFormVisible && (
          <div className="left flex items-center justify-center w-full p-5 lg:hidden">
            <UserInfoForm />
          </div>
        )}
        <div className="hidden lg:flex items-center justify-center w-full p-5">
          <UserInfoForm />
        </div>
      </div>
      <div className="right w-full lg:w-[40%] lg:h-screen flex flex-col">
        <h1 className="text-xl text-center py-2 font-bold">Recently Brought</h1>
        <div className="w-full overflow-y-auto flex-1 flex flex-wrap lg:flex-row flex-col items-center md:px-16 p-5 justify-center gap-5">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
