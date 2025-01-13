"use client";
import React, { useState } from "react";
import adminStore from "@/store/admin/adminProfile";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import TodayEntryTable from "../entryTable/TodayEntryTable";
import { Separator } from "@/components/ui/separator";
const SearchPatient = () => {
  const { admin } = adminStore();
  const [mobileNumber, setMobileNumber] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const handleSearch = () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/admin/getEntries?mobileNumber=${mobileNumber}`,
      headers: {
        "auth-token": admin?.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setData(response.data.data);
          setShowTable(true);
          toast({
            type: "success",
            message: "Data fetched successfully",
          });
        } else {
          setData([]);
          setShowTable(false);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className=" flex  items-center justify-around">
        <Input
          className="w-1/2"
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter mobile number"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="mt-5">
        <Separator />
        <TodayEntryTable entries={data} />
      </div>
    </>
  );
};

export default SearchPatient;
