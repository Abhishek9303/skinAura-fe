"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLine, RiSaveLine } from "@remixicon/react";
import { couponService } from "@/services/couponService";
import { useToast } from "@/hooks/use-toast";

const CouponModal = ({ coupon, onClose, onSuccess }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      discountPercentage: 0,
      maxDiscountAmount: 0,
      minPurchaseAmount: 0,
      expirationDate: "",
      usageLimit: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (coupon) {
      const formattedDate = coupon.expirationDate ? new Date(coupon.expirationDate).toISOString().split('T')[0] : "";
      reset({
        ...coupon,
        expirationDate: formattedDate,
      });
    } else {
      reset({
        code: "",
        discountPercentage: 0,
        maxDiscountAmount: 0,
        minPurchaseAmount: 0,
        expirationDate: "",
        usageLimit: "",
        isActive: true,
      });
    }
  }, [coupon, reset]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (coupon) {
        response = await couponService.updateCoupon(coupon._id, data);
      } else {
        response = await couponService.createCoupon(data);
      }

      if (response.success) {
        toast({
          title: "Success",
          description: `Coupon ${coupon ? "updated" : "created"} successfully`,
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.data || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-juanaBold text-[#6A4D6F]">
              {coupon ? "Edit Coupon" : "Create New Coupon"}
            </h2>
            <p className="text-[10px] text-[#DF9D43] uppercase tracking-widest font-juanaMedium"> Coupon Configuration</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Coupon Code</label>
              <input
                {...register("code", { required: "Code is required" })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all"
                placeholder="e.g. SUMMER50"
              />
              {errors.code && <p className="text-red-500 text-[10px] font-sans mt-1">{errors.code.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Discount Percentage (%)</label>
              <input
                type="number"
                {...register("discountPercentage", { required: "Required", min: 0, max: 100 })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Min Purchase (₹)</label>
              <input
                type="number"
                {...register("minPurchaseAmount", { min: 0 })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Max Discount (₹)</label>
              <input
                type="number"
                {...register("maxDiscountAmount", { min: 0 })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Expiration Date</label>
              <input
                type="date"
                {...register("expirationDate")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Usage Limit (Optional)</label>
              <input
                type="number"
                {...register("usageLimit")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none font-sans font-medium text-sm transition-all"
                placeholder="No limit"
              />
            </div>

            <div className="flex items-center gap-3 py-4">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-5 h-5 rounded-lg border-gray-200 text-[#6A4D6F] focus:ring-[#6A4D6F] transition-all"
              />
              <span className="text-xs font-juanaBold text-gray-600 uppercase tracking-widest">Is Active</span>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border border-gray-100 rounded-2xl font-juanaBold text-sm text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 px-6 bg-[#6A4D6F] text-white rounded-2xl font-juanaBold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#6A4D6F]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RiSaveLine size={20} />
              {isSubmitting ? "Saving..." : (coupon ? "Update Coupon" : "Create Coupon")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
