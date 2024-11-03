import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { RiPencilLine } from "@remixicon/react";
import adminStore from "@/store/admin/adminProfile";
import { toast } from "react-toastify";

const MeetingList = ({ type }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // Holds the currently edited meeting ID
  const { admin } = adminStore();

  // Fetch meetings based on the type
  const fetchMeetings = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}api/v1/admin/getAllMeetingReq?reason=${type}`,
        {
          headers: {
            "auth-token": admin.token,
          },
        }
      );
      setMeetings(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching meetings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [type]);

  const saveMeetingChanges = async (id, updatedData) => {
    try {
      await axios.put(
        `${process.env.BACKEND_URL}api/v1/admin/approveMeeting?meetingId=${id}`,
        updatedData,
        {
          headers: {
            "auth-token": admin.token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Meeting updated successfully!");
      setIsEditing(null); // Close editing modal
      fetchMeetings(); // Re-fetch meetings after saving changes
    } catch (error) {
      toast.error("Error saving meeting changes");
      console.error("Error saving meeting changes:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "userDetails.name",
      },
      {
        Header: "Time",
        accessor: "meetingTime",
      },
      {
        Header: "Date",
        accessor: "meetingDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value, row }) => (
          <RiPencilLine
            onClick={() => setIsEditing(row.original)}
            className="text-blue-600 cursor-pointer"
          />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: meetings },
    useGlobalFilter,
    useSortBy
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      {/* <h2 className="text-2xl font-semibold mb-4">{type}</h2> */}
      <input
        type="text"
        placeholder="Search meetings..."
        value={tableInstance.state.globalFilter || ""}
        onChange={(e) => tableInstance.setGlobalFilter(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />
      <table
        {...tableInstance.getTableProps()}
        className="table-auto w-[60vw] border rounded-lg shadow-md "
      >
        <thead className="bg-gray-200">
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-4 text-left"
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
        <tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Meeting</h2>
            <div className="mb-4">
              <label className="block mb-1">User:</label>
              <div className="border p-2">{isEditing.userDetails.name}</div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Time:</label>
              <select
                className="border p-2 w-full"
                value={isEditing.meetingTime}
                onChange={(e) =>
                  setIsEditing((prev) => ({
                    ...prev,
                    meetingTime: e.target.value,
                  }))
                }
              >
                <option value="">Select Time</option>
                <option value="10:00 - 12:00">10:00 - 12:00</option>
                <option value="12:00 - 2:00">12:00 - 2:00</option>
                <option value="2:00 - 4:00">2:00 - 4:00</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                className="border p-2 w-full"
                value={isEditing.meetingDate.slice(0, 10)}
                onChange={(e) =>
                  setIsEditing((prev) => ({
                    ...prev,
                    meetingDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Status:</label>
              <select
                className="border p-2 w-full"
                value={isEditing.status}
                onChange={(e) =>
                  setIsEditing((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  saveMeetingChanges(isEditing._id, {
                    meetingTime: isEditing.meetingTime,
                    meetingDate: isEditing.meetingDate,
                    status: isEditing.status,
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingList;
