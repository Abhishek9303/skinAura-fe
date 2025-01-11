import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../hooks/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import adminStore from "@/store/admin/adminProfile";
import TodayEntryTable from "./entryTable/TodayEntryTable";
import { format } from "date-fns";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  mobileNumber: z
    .string()
    .nonempty("Mobile number is required")
    .min(10, "Must be 10 digits")
    .max(10, "Must be 10 digits"),
  paymentMethod: z.enum(
    ["Cash", "Online", "Free"],
    "Payment method is required"
  ),
  place: z.string().nonempty("Place is required"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  notes: z.string().optional(),
  purpose: z.string().optional(),
  cashAmount: z.string().optional(),
  onlineAmount: z.string().optional(),
  remarks: z.string().optional(),
  discount: z.string().optional(),
  amountPaid: z.string().optional(),
  paymentModeSplit: z.boolean().optional(),
});

const ManageDailyEntry = () => {
  const { admin } = adminStore();
  const { toast } = useToast();
  const [isCashChecked, setIsCashChecked] = useState(false);
  const [isOnlineChecked, setIsOnlineChecked] = useState(false);
  const [isFollowUpChecked, setIsFollowUpChecked] = useState(false);
  const [entries, setEntries] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      paymentMethod: "Cash",
      place: "",
      amount: 0,
      gender: "",
      notes: "",
      purpose: "",
      cashAmount: "",
      onlineAmount: "",
      remarks: "",
      discount: "",
      amountPaid: "",
      paymentModeSplit: false,
    },
  });

  useEffect(() => {
    if (isCashChecked && isOnlineChecked) {
      setValue("paymentModeSplit", true);
    } else {
      setValue("paymentModeSplit", false);
    }
  }, [isCashChecked, isOnlineChecked, setValue]);

  const getAllTodayEntry = useCallback(async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/admin/getAllTodaysEntry?startDate=${today}`,
      headers: {
        "auth-token": admin?.token,
      },
    };

    try {
      const response = await axios.request(config);
      setEntries(response.data.data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Fetch Today's Entries",
        description: error.message,
      });
      console.error("Error fetching today's entries:", error);
    }
  }, [admin?.token, toast]);

  const addUserEntry = async (newUserData) => {
    const data = JSON.stringify({
      ...newUserData,
      purpose: isFollowUpChecked ? "follow up" : newUserData.purpose,
      amount: isFollowUpChecked ? "0" : newUserData.amount,
      paymentDetails: {
        cash: isCashChecked ? newUserData.cashAmount : "0",
        online: isOnlineChecked ? newUserData.onlineAmount : "0",
        remarks: newUserData.remarks || "",
        discount: newUserData.discount || "0",
        amountPaid: newUserData.amountPaid || "0",
        paymentModeSplit: isCashChecked && isOnlineChecked,
      },
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND_URL}api/v1/admin/addUserEntry`,
      headers: {
        "auth-token": admin.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.data.success) {
        toast({
          variant: "success",
          title: "Entry Added Successfully",
        });
        await getAllTodayEntry();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      console.error("Error adding entry:", error);
    } finally {
      reset();
    }
  };

  const handleAddDiscount = (data) => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/v1/admin/updateDiscount",
      headers: {
        "auth-token": admin?.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.success) {
          let updatedData = [...data];
          updatedData[selectedRow.index] = response.data.data;
          setData(updatedData);
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error?.response,
          variant: "destructive",
        });
      })
      .finally(() => {
        getAllTodayEntry();
        toast("Discount updated successfully", "success");
      });
  };

  useEffect(() => {
    admin?.token && getAllTodayEntry();
  }, [getAllTodayEntry]);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(addUserEntry)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <Input
            {...register("name")}
            type="text"
            placeholder="Enter name"
            className="mt-1 block w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number:
          </label>
          <Input
            {...register("mobileNumber")}
            type="text"
            placeholder="Enter mobile number"
            className="mt-1 block w-full"
          />
          {errors.mobileNumber && (
            <span className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purpose of visit:
          </label>
          <Input
            {...register("purpose")}
            type="text"
            placeholder="Enter purpose"
            className="mt-1 block w-full"
          />
          {errors.purpose && (
            <span className="text-red-500 text-sm">
              {errors.purpose?.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Place:
          </label>
          <Input
            {...register("place")}
            type="text"
            placeholder="Enter Place"
            className="mt-1 block w-full"
          />
          {errors.place && (
            <span className="text-red-500 text-sm">{errors.place.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                {...register("gender")}
                type="radio"
                value="Male"
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                {...register("gender")}
                type="radio"
                value="Female"
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500 text-sm">
              {errors.gender.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add Some Additional notes:
          </label>
          <textarea
            {...register("notes")}
            placeholder="note here"
            className="border-1 w-full h-10 p-2"
          ></textarea>
          {errors.notes && (
            <span className="text-red-500 text-sm">{errors.notes.message}</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isCashChecked}
              onChange={() => setIsCashChecked(!isCashChecked)}
              className="form-checkbox"
            />
            <span className="ml-2">Cash</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isOnlineChecked}
              onChange={() => setIsOnlineChecked(!isOnlineChecked)}
              className="form-checkbox"
            />
            <span className="ml-2">Online</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isFollowUpChecked}
              onChange={() => {
                setIsFollowUpChecked(!isFollowUpChecked);
              }}
              className="form-checkbox"
            />
            <span className="ml-2">Follow Up</span>
          </label>
        </div>

        {isCashChecked && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cash Amount:
            </label>
            <Input
              {...register("cashAmount")}
              type="text"
              placeholder="Enter cash amount"
              className="mt-1 block w-full"
            />
          </div>
        )}

        {isOnlineChecked && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Online Amount:
            </label>
            <Input
              {...register("onlineAmount")}
              type="text"
              placeholder="Enter online amount"
              className="mt-1 block w-full"
            />
          </div>
        )}

        <Button type="submit">Add Entry</Button>
      </form>

      {
        <TodayEntryTable
          entries={entries}
          handleAddDiscount={handleAddDiscount}
        />
      }
    </div>
  );
};

export default ManageDailyEntry;
