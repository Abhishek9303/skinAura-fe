"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { RiAddLine, RiPencilLine, RiDeleteBin4Fill, RiSearchLine, RiCoupon2Line } from "@remixicon/react";
import { couponService } from "@/services/couponService";
import CouponModal from "./CouponModal";
import { useToast } from "@/hooks/use-toast";

const StatusBadge = ({ isActive }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-juanaBold uppercase tracking-widest border ${
    isActive ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"
  }`}>
    {isActive ? "Active" : "Inactive"}
  </span>
);

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const { toast } = useToast();

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await couponService.getAllCoupons();
      if (response.success) {
        setCoupons(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.data || "Failed to fetch coupons",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = () => {
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await couponService.deleteCoupon(id);
        if (response.success) {
          toast({ title: "Success", description: "Coupon deleted successfully" });
          fetchCoupons();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.data || "Failed to delete coupon",
          variant: "destructive",
        });
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Coupon Code",
        accessor: "code",
        Cell: ({ value }) => (
          <div className="flex items-center gap-2">
            <RiCoupon2Line size={16} className="text-[#6A4D6F]" />
            <span className="font-juanaBold text-[#6A4D6F]">{value}</span>
          </div>
        ),
      },
      {
        Header: "Discount",
        accessor: "discountPercentage",
        Cell: ({ value }) => <span className="font-sans font-bold text-[#6A4D6F]">{value}% OFF</span>,
      },
      {
        Header: "Min / Max",
        Cell: ({ row }) => (
          <div className="flex flex-col text-[10px] uppercase tracking-wider">
            <span className="text-gray-400">Min: ₹{row.original.minPurchaseAmount}</span>
            <span className="text-gray-400">Max: ₹{row.original.maxDiscountAmount}</span>
          </div>
        ),
      },
      {
        Header: "Expiry",
        accessor: "expirationDate",
        Cell: ({ value }) => (
          <span className="text-xs font-medium text-gray-600">
            {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ value }) => <StatusBadge isActive={value} />,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all"
            >
              <RiPencilLine size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <RiDeleteBin4Fill size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: coupons,
    },
    useGlobalFilter,
    useSortBy
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setGlobalFilter(e.target.value);
  };

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#6A4D6F]/20 border-t-[#6A4D6F] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">Promotions</p>
          <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">Manage Coupons</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl font-sans font-medium text-sm shadow-sm focus:ring-2 focus:ring-[#6A4D6F]/10 transition-all outline-none"
            />
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#6A4D6F] text-white rounded-2xl font-juanaBold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#6A4D6F]/20 whitespace-nowrap"
          >
            <RiAddLine size={20} />
            Add Coupon
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table {...getTableProps()} className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-gray-50">
              {headerGroups.map((group) => (
                <tr {...group.getHeaderGroupProps()}>
                  {group.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-8 py-6 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-[#6A4D6F] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {column.render("Header")}
                        <span className="text-[8px]">{column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-8 py-6">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-8 py-12 text-center text-gray-400 font-juanaMedium">
                    No coupons found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <CouponModal
          coupon={selectedCoupon}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchCoupons}
        />
      )}
    </div>
  );
};

export default ManageCoupons;
