import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import EditOrderModal from "../editOrderModel/EditOrderModal";
import ViewOrderModal from "../editOrderModel/ViewOrderModal";
import adminStore from "@/store/admin/adminProfile";
import { RiEyeLine, RiDeleteBin4Fill, RiPencilLine, RiSearchLine } from "@remixicon/react";

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
          'auth-token': admin?.token
        },
        data: data
      };

      await axios(config);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order?._id === updatedOrder?._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      { 
        Header: "Customer", 
        accessor: "userData.name",
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-juanaBold text-[#6A4D6F]">{row.original.userData.name}</span>
            <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest">{row.original.userData.mobileNo}</span>
          </div>
        )
      },
      {
        Header: "Date",
        accessor: "orders.orderDate",
        Cell: ({ value }) => (
          <div className="flex flex-col">
            <span className="font-sans font-bold text-[#6A4D6F] text-xs">
              {new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-[10px] text-gray-400 font-sans font-medium uppercase tracking-widest">
              {new Date(value).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )
      },
      {
        Header: "Location",
        accessor: (row) => row.orders.shippingAddress.city,
        Cell: ({ row }) => (
          <div className="flex flex-col max-w-[200px]">
             <span className="font-juanaMedium text-gray-700 text-sm truncate">
               {row.original.orders.shippingAddress.addressLine1}
             </span>
             <span className="text-[10px] text-gray-400 font-juanaBold uppercase tracking-tighter">
               {row.original.orders.shippingAddress.city}, {row.original.orders.shippingAddress.state}
             </span>
          </div>
        )
      },
      { 
        Header: "Payment", 
        accessor: "orders.paymentMode",
        Cell: ({ value }) => (
          <span className="font-sans font-bold text-[#DF9D43] text-[10px] uppercase tracking-widest leading-none">
            {value}
          </span>
        )
      },
      { 
        Header: "Status", 
        accessor: "orders.status",
        Cell: ({ value }) => <StatusBadge status={value} />
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleViewDetails(row.original)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              <RiEyeLine size={16} />
            </button>
            <button 
              onClick={() => handleEdit(row.original)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all"
            >
              <RiPencilLine size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 cursor-not-allowed">
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
      data: orders,
      initialState: { sortBy: [{ id: "userData.name", desc: false }] },
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
  
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center text-red-500 font-juanaBold">
      {error}
    </div>
  );

  return (
    <div className="w-full py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">Admin Panel</p>
          <h1 className="text-3xl font-juanaBold text-[#6A4D6F]">Manage Orders</h1>
        </div>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl font-sans font-medium text-sm shadow-sm focus:ring-2 focus:ring-[#6A4D6F]/10 transition-all outline-none"
          />
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] custom-scrollbar">
          <table {...getTableProps()} className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-gray-50">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-8 py-6 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest whitespace-nowrap bg-white cursor-pointer hover:text-[#6A4D6F] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {column.render("Header")}
                        <span className="text-[8px]">
                          {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                        </span>
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editOrder && (
        <EditOrderModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onSave={handleSave}
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

