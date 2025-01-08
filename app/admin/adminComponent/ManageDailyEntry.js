import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddExpense from "../../components/expenseModal/AddExpense";
import axios from "axios";
import adminStore from "@/store/admin/adminProfile";
import TodayEntryTable from "./entryTable/TodayEntryTable";
import { format } from "date-fns";
const schema = z.object({
  name: z.string().nonempty("Name is required"),
  mobileNumber: z
    .string()
    .nonempty("Mobile number is required")
    .min(10)
    .max(10),
  paymentMethod: z.enum(
    ["Cash", "Online", "Free"],
    "Payment method is required"
  ),
  amount: z.string().nonempty("Amount is required"),
  gender: z.enum(["Male", "Female"], "Gender is required"),
  notes: z.string().optional(),
  purpose : z.string().optional()
});

const ManageDailyEntry = () => {
  const { admin } = adminStore();
  const { toast } = useToast();
  const [showTable, setShowTable] = useState(false);
  const [showFreeOption, setShowFreeOption] = useState(false);
  const [entries, setEntries] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      paymentMethod: "Cash",
      amount: "",
      token: "",
      gender: "",
      notes: "",
      purpose : "",
    },
  });

  const toggleFreeOption = (event) => {
    setShowFreeOption(event.target.checked);
  };
    const getAllTodayEntry = useCallback(async () => {
      const today = format(new Date , 'yyyy-MM-dd')
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/admin/getAllTodaysEntry?startDate=${today}`,
        headers: {
          "auth-token": admin.token,
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
        console.error(
          "Error fetching today's entries:",
          error.response ? error.response.data : error.message
        );
      }
    }, []);
  const addUserEntry = async (newUserData) => {
    const data = JSON.stringify(newUserData);

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
          title: "Patient Added Successfully",
        });
        await getAllTodayEntry(); // Fetch updated entries
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      console.error(
        "Error adding user entry:",
        error.response ? error.response.data : error.message
      );
    } finally {
      getAllTodayEntry();
      reset();
    }
  };



  useEffect(() => {
    getAllTodayEntry();
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
            Amount:
          </label>
          <Input
            {...register("amount")}
            type="text"
            placeholder="Enter amount"
            className="mt-1 block w-full"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">
              {errors.amount.message}
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
            <span className="text-red-500 text-sm">{errors.purpose?.message}</span>
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method:
          </label>
          <select
            {...register("paymentMethod")}
            className="mt-1 block w-auto border"
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            {showFreeOption && <option value="Free">Free</option>}
          </select>
          {errors.paymentMethod && (
            <span className="text-red-500 text-sm">
              {errors.paymentMethod.message}
            </span>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <hr className="my-5" />
      <h2 className="font-bold">Today's Entry </h2>
      {<TodayEntryTable entries={entries} />}

      <div>
        <div className="mt-4">
          <input type="checkBox" onChange={toggleFreeOption} className="mt-1" />
        </div>
      </div>
      <div className="mt-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Expense</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Add New Expense</SheetTitle>
              <SheetDescription>
                Fill out the form below to add a new expense.
              </SheetDescription>
            </SheetHeader>
            <AddExpense />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ManageDailyEntry;
