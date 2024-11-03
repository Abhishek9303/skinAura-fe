"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { toast } from "react-toastify";

// Define a global filter component
function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      Search:{" "}
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-1 rounded"
        placeholder="Search orders..."
      />
    </span>
  );
}

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderHistory = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `${process.env.BACKEND_URL}api/v1/common/getOrder`,
        headers: {
          "auth-token": authToken,
        },
      };
      const res = await axios.request(config);
      if (res.data.status) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to retrieve order history.");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Error fetching order history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "productDetails.name",
        Cell: ({ row }) => (
          <Link href={`/products/${row.original.productDetails._id}`}>
            <p className="text-blue-500 hover:underline">
              {row.original.productDetails.name}
            </p>
          </Link>
        ),
      },
      {
        Header: "Order Date",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Price",
        accessor: "productDetails.price",
        Cell: ({ value }) => `${value.toFixed(2)}`,
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Shipping Address",
        accessor: "shippingAddress",
        Cell: ({ value }) =>
          `${value.addressLine1}, ${value.city}, ${value.state}, ${value.country}, ${value.pinCode}`,
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
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: orders,
    },
    useGlobalFilter, // Use global filter hook
    useSortBy // Use sorting hook
  );

  const { globalFilter } = state;

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="w-full overflow-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="mb-4">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 border text-left"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
