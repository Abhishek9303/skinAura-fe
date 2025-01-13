import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonPage = () => {
  return (
    <div className="h-full w-full bg-white p-10 rounded-lg shadow">
      <Skeleton count={1} height={40} width={200} className="mb-4" />
      <Skeleton count={5} height={30} />
    </div>
  );
};

export default SkeletonPage;
