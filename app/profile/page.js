"use client";
import userProtectionRoute from "../../store/user/userProtectionRoute";
import React, { useState } from "react";
import UserInfoForm from "../components/userInfoForm/UserInfoForm";
import OrderCard from "../components/orderCard/OrderCard";
import useUserStore from "../../store/user/userProfile";

const Page = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user } = useUserStore();
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="w-full flex items-center justify-between p-5 md:px-16">
        <h1 className="text-xl font-bold">Hey! {user.name}</h1>
        <button
          className="border-1 bg-[#6A4D6F] text-white md:px-8 px-4 py-2 rounded-lg"
          onClick={toggleFormVisibility}
        >
          Edit Profile
        </button>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" p-8 rounded-lg w-[90%] max-w-xl max-h-[80vh] overflow-y-auto">
            <UserInfoForm closeForm={toggleFormVisibility} />
            <button
              className="mt-4 border-1 bg-[#6A4D6F] text-white px-4 py-2 rounded-lg block md:hidden"
              onClick={toggleFormVisibility}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex-grow">
        <h1 className="text-xl text-center py-2 font-bold">Recently Brought</h1>
        <div className="w-full overflow-y-auto flex flex-wrap items-center md:px-16 p-5 justify-center gap-5">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default userProtectionRoute(Page);
