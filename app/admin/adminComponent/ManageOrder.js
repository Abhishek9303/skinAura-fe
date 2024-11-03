import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import EditOrderModal from "../../admin/editOrderModel/EditOrderModal";
import ViewOrderModal from "../editOrderModel/ViewOrderModal";
import adminStore from "@/store/admin/adminProfile";
import { RiEyeLine, RiDeleteBin4Fill, RiPencilLine } from "@remixicon/react";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const { admin } = adminStore();
  const [searchTerm, setSearchTerm] = useState("");

   const fetchOrders = async () => {
     try {
       const response = await axios.get(
         `${process.env.BACKEND_URL}api/v1/common/getAllOrders`,
         {
           headers: {
             "auth-token": admin.token,
           },
         }
       );
       setOrders(response.data.data);
       setLoading(false);
     } catch (err) {
       setError("Error fetching orders");
       setLoading(false);
     }
   };

  useEffect(() => {
    fetchOrders();
  }, [admin.token, editOrder]);

  const handleViewDetails = (order) => {
    setViewOrder(order);
  };

  const handleEdit = (order) => {
    setEditOrder(order);
  };

  const handleSave = async (updatedOrder) => {
    try {
      let data = JSON.stringify(updatedOrder);

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/common/updateOrder?orderId=${updatedOrder.orderId}`,
        headers: { 
          'Content-Type': 'application/json', 
          'auth-token': admin.token
        },
        data: data
      };

      await axios(config);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "userData.name" },
      { Header: "Phone Number", accessor: "userData.mobileNo" },
      {
        Header: "Address",
        accessor: (row) =>
          `${row.orders.shippingAddress.addressLine1}, ${row.orders.shippingAddress.city}, ${row.orders.shippingAddress.state}, ${row.orders.shippingAddress.country}`,
      },
      { Header: "Payment Mode", accessor: "orders.paymentMode" },
      { Header: "Order Status", accessor: "orders.status" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleViewDetails(row.original)}>
              <RiEyeLine className="text-blue-500 hover:text-blue-700" />
            </button>
            <button onClick={() => handleEdit(row.original)}>
              <RiPencilLine className="text-yellow-500 hover:text-yellow-700" />
            </button>
            <button className="cursor-not-allowed">
              <RiDeleteBin4Fill className="text-red-500 hover:text-red-700" />
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
      data: orders,
      initialState: { sortBy: [{ id: "userData.name", desc: false }] }, // Default sorting by name
    },
    useGlobalFilter,
    useSortBy
  );

  // Function to filter data based on search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setGlobalFilter(e.target.value); // Set global filter for search
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Manage Orders</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2"
        />
      </div>
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-300 mt-4"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border border-gray-300 p-2 text-left bg-gray-100"
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
                  <td
                    {...cell.getCellProps()}
                    className="border border-gray-300 p-2"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Order Modal */}
      {editOrder && (
        <EditOrderModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onSave={handleSave} // Pass handleSave to update the order
        />
      )}

      {/* View Order Modal */}
      {viewOrder && (
        <ViewOrderModal order={viewOrder} onClose={() => setViewOrder(null)} />
      )}
    </div>
  );
};

export default ManageOrder;
