"use client";
import React, { useState } from "react";
import adminStore from "@/store/admin/adminProfile";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import TodayEntryTable from "../entryTable/TodayEntryTable";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Import Sheet components

const SearchPatient = () => {
  const { admin } = adminStore();
  const [mobileNumber, setMobileNumber] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [date, setDate] = useState("");
  const {toast} = useToast();
  const [email, setEmail] = useState("");

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
          toast({
            type: "error",
            message: "No data found",
            variant : "destructive"
          });
          setShowTable(false);
        }
      })
      .catch((error) => {
        toast({
          type: "error",
          message: "Failed to fetch data",
          variant: "destructive",
        });
      });
  };

  const handleDownload = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/admin/getAllTodaysEntry?startDate=${date}&download=true&emailId=${email}`,
      headers: {
        "auth-token": admin?.token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if(response.data.success){
          toast({
            type: "success",
            message: "Report downloaded successfully",
          });
        }
      })
      .catch((error) => {
        toast({
          type: "error",
          message: "Failed to download report",
          variant: "destructive",
        });
      })
      .finally(() => {
        setShowSheet(false);
      })
  };

  return (
    <>
      <div className=" flex  items-center justify-between">
        <Input
          className="w-1/2"
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter mobile number"
        />
        <div className="flex gap-5">
          <Button onClick={handleSearch}>Search</Button>
          <Sheet>
            <SheetTrigger asChild>
              <div>
                <Button>Download Report</Button>
              </div>
            </SheetTrigger>
            <SheetContent>
              <div className="p-4">
                <h2 className="text-lg font-semibold">Download Report</h2>
                <div className="mt-4">
                  <Input
                    type="date"
                    placeholder="Select date"
                    className="w-full mb-4"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={handleDownload}>Download</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-5">
        <Separator />
        <TodayEntryTable entries={data} />
      </div>
    </>
  );
};

export default SearchPatient;
