import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MeetingApproval = () => {
  const [meetings, setMeetings] = useState([]);
  const [isEditing, setIsEditing] = useState({}); // Track editing state for each meeting

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}api/v1/admin/getAllMeetingReq`,
          {
            headers: {
              "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc4NTQwOWEzOWYzNDE0ZmQ2ZTkxNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTMxODY2M30.hfjRRwnaLnRino8FuWNL9WYZRiNgx0yTrerF7WSq4Fo`, // Use environment variable for token
            },
          }
        );
        setMeetings(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching meetings:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchMeetings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.BACKEND_URL}api/v1/admin/deleteMeeting/${id}`,
        {
          headers: {
            "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc4NTQwOWEzOWYzNDE0ZmQ2ZTkxNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTMxODY2M30.hfjRRwnaLnRino8FuWNL9WYZRiNgx0yTrerF7WSq4Fo`, // Use environment variable for token
          },
        }
      );
      setMeetings(meetings.filter((meeting) => meeting._id !== id));
    } catch (error) {
      console.error(
        "Error deleting meeting:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleLinkChange = (id, newLink) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting._id === id ? { ...meeting, meetingLink: newLink } : meeting
      )
    );
  };

  const handleSlotChange = (id, field, value) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting._id === id ? { ...meeting, [field]: value } : meeting
      )
    );
  };

const saveMeetingChanges = async (id, updatedData) => {
  const data = JSON.stringify({
    meetingLink: updatedData.meetingLink,
    status: updatedData.status,
    meetingTime: updatedData.meetingTime,
    meetingDate: updatedData.meetingDate,
  });

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.BACKEND_URL}api/v1/admin/approveMeeting?meetingId=${id}`,
    headers: {
      "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc4NTQwOWEzOWYzNDE0ZmQ2ZTkxNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTMxODY2M30.hfjRRwnaLnRino8FuWNL9WYZRiNgx0yTrerF7WSq4Fo`, // Use environment variable for token
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    toast.success("Meeting updated successfully!");
    console.log("Meeting updated successfully:", response.data);
    // Optionally update the local state if needed
  } catch (error) {
    toast.error(
      `Error saving meeting changes`
    );
    console.error(
      "Error saving meeting changes:",
      error.response ? error.response.data : error.message
    );
  }
};

  const toggleEdit = (id) => {
    setIsEditing({ ...isEditing, [id]: !isEditing[id] });
  };

  return (
    <div className="p-6 bg-gray-100 h-auto">
      <h1 className="text-2xl font-semibold mb-4">Meeting Approval</h1>
      <ul className="space-y-4 ">
        {meetings.map((meeting) => (
          <li
            key={meeting._id}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between">
              {isEditing[meeting._id] ? (
                <div className="flex flex-col w-full space-y-2">
                  <div>
                    <label className="block text-sm">Meeting Link:</label>
                    <input
                      type="text"
                      value={meeting.meetingLink || ""}
                      onChange={(e) =>
                        handleLinkChange(meeting._id, e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Meeting Date:</label>
                    <input
                      type="date"
                      value={meeting.meetingDate.slice(0, 10)}
                      onChange={(e) =>
                        handleSlotChange(
                          meeting._id,
                          "meetingDate",
                          e.target.value
                        )
                      }
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Meeting Time Slot:</label>
                    <select
                      value={meeting.meetingTime || ""}
                      onChange={(e) =>
                        handleSlotChange(
                          meeting._id,
                          "meetingTime",
                          e.target.value
                        )
                      }
                      className="p-2 border rounded w-full"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="10:00 - 12:00">10:00 - 12:00</option>
                      <option value="12:00 - 2:00">12:00 - 2:00</option>
                      <option value="2:00 - 4:00">2:00 - 4:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Status:</label>
                    <select
                      value={meeting.status}
                      onChange={(e) =>
                        handleSlotChange(meeting._id, "status", e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() =>
                        saveMeetingChanges(meeting._id, {
                          meetingLink: meeting.meetingLink,
                          meetingDate: meeting.meetingDate,
                          meetingTime: meeting.meetingTime,
                          status: meeting.status,
                        })
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => toggleEdit(meeting._id)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full">
                    <p className="text-sm font-medium">
                      <span className="font-bold">Link:</span>{" "}
                      {meeting.meetingLink || "No link"}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Date:</span>{" "}
                      {new Date(meeting.meetingDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}{" "}
                      |<span className="font-bold"> Time:</span>{" "}
                      {meeting.meetingTime || "No time"}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Status:</span>{" "}
                      {meeting.status}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleEdit(meeting._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(meeting._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingApproval;
