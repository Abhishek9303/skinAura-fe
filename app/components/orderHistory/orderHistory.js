"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { toast } from "react-toastify";
import Button from "@/app/components/button/Button";

// Global Filter Component
function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="relative w-full md:w-80">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl font-juanaMedium text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 transition-all outline-none"
        placeholder="Search by product name..."
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    completed: "bg-green-50 text-green-600 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
    delivered: "bg-blue-50 text-blue-600 border-blue-200",
    processing: "bg-[#6A4D6F]/5 text-[#6A4D6F] border-[#6A4D6F]/20",
  };

  const currentStyle = styles[status?.toLowerCase()] || styles.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-juanaBold uppercase tracking-widest border ${currentStyle}`}>
      {status || "Pending"}
    </span>
  );
};

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchOrderHistory = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.get(`${process.env.BACKEND_URL}api/v1/common/getOrder`, {
        headers: { "auth-token": authToken },
      });
      if (res.data.status) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Order history fetch error:", error);
      toast.error("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.post(`${process.env.BACKEND_URL}api/v1/common/cancelOrder`, 
        { orderId }, 
        { headers: { "auth-token": authToken } }
      );
      if (res.data.status) {
        toast.success("Order cancelled");
        fetchOrderHistory();
      }
    } catch (error) {
      toast.error("Could not cancel order");
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "productDetails.name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden hidden sm:block border border-gray-100 p-1">
              <img 
                src={row.original.productDetails.mainImage || "/images/placeholder.png"} 
                className="w-full h-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <Link href={`/products/${row.original.productDetails._id}`}>
              <p className="font-juanaSemibold text-[#6A4D6F] hover:text-[#DF9D43] transition-colors leading-tight">
                {row.original.productDetails.name}
              </p>
            </Link>
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => (
          <span className="text-gray-500 font-juanaMedium text-sm">
            {new Date(value).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <StatusBadge status={value} />,
      },
      {
        Header: "Total",
        accessor: "productDetails.price",
        Cell: ({ row }) => (
          <span className="font-juanaBold text-gray-900">
            ₹{(row.original.productDetails.price * row.original.quantity).toLocaleString()}
          </span>
        ),
      },
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#6A4D6F] transition-all"
          >
            {expandedRow === row.id ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            )}
          </button>
        ),
      },
    ],
    [expandedRow]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: orders }, useGlobalFilter, useSortBy);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6A4D6F]/20 border-t-[#6A4D6F] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛍️</div>
        <h3 className="text-2xl font-juanaBold text-[#6A4D6F] mb-2">No orders yet</h3>
        <p className="text-gray-400 font-juanaRegular mb-8">Your shopping journey awaits!</p>
        <Link href="/products">
          <Button text="Start Shopping" className="rounded-full px-12" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">My Account</p>
          <h1 className="text-3xl md:text-4xl font-juanaBold text-[#6A4D6F]">Order History</h1>
        </div>
        <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="w-full text-left border-collapse">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-gray-50">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-8 py-6 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest whitespace-nowrap"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const isExpanded = expandedRow === row.id;
                return (
                  <React.Fragment key={row.id}>
                    <tr {...row.getRowProps()} className={`group border-b border-gray-50 transition-colors ${isExpanded ? 'bg-gray-50/50' : 'hover:bg-gray-50/30'}`}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="px-8 py-6">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={columns.length} className="px-8 py-0">
                          <div className="py-8 border-t border-gray-100 flex flex-col md:flex-row gap-12 bg-white/50 backdrop-blur-sm rounded-b-3xl">
                            {/* Detailed Info */}
                            <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8">
                              <div>
                                <p className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-2">Order ID</p>
                                <p className="text-xs font-mono text-[#6A4D6F] truncate">{row.original._id}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-2">Quantity</p>
                                <p className="text-sm font-juanaBold text-gray-800">{row.original.quantity} Unit(s)</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-2">Unit Price</p>
                                <p className="text-sm font-juanaBold text-gray-800">₹{row.original.productDetails.price.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-2">Payment</p>
                                <p className="text-sm font-juanaBold text-[#DF9D43] uppercase">PREPAID</p>
                              </div>
                            </div>

                            {/* Address & Actions */}
                            <div className="md:w-1/3 flex flex-col gap-6">
                              <div>
                                <p className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest mb-2 text-right">Delivery To</p>
                                <p className="text-xs font-juanaMedium text-gray-500 text-right leading-relaxed">
                                  {row.original.shippingAddress.addressLine1}<br/>
                                  {row.original.shippingAddress.city}, {row.original.shippingAddress.state} - {row.original.pinCode || row.original.shippingAddress.pinCode}
                                </p>
                              </div>
                              <div className="flex justify-end gap-3">
                                {row.original.status !== "Completed" && row.original.status !== "Cancelled" && (
                                  <button
                                    onClick={() => handleCancelOrder(row.original._id)}
                                    className="px-6 py-2 rounded-xl bg-red-50 text-red-600 font-juanaBold text-[10px] uppercase tracking-widest hover:bg-red-100 transition-colors"
                                  >
                                    Cancel Order
                                  </button>
                                )}
                                <Link href={`/products/${row.original.productDetails._id}`}>
                                  <button className="px-6 py-2 rounded-xl border border-gray-100 font-juanaBold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors">
                                    Reorder
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryTable;
