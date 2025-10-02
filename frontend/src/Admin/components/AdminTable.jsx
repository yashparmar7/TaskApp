import { PencilLine, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const AdminTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  totalPages,
  page,
  setPage,
  limit,
  setLimit,
  usersList = [],
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditData({ ...item, user: item.user?._id || "" });
  };

  const handleSave = async () => {
    if (!editData || !editData._id) return;

    const payload = {
      ...editData,
      user: editData.user,
    };

    try {
      await onEdit(payload);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-600 font-bold">{title}</h1>
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden border border-gray-200">
        <thead className="bg-gray-500 text-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-4 border text-left">
                {col.label}
              </th>
            ))}
            <th className="px-5 py-4 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="border px-4 py-2">
                    {editingId === item._id ? (
                      col.key === "user" ? (
                        <select
                          value={editData.user || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, user: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select User</option>
                          {usersList.map((u) => (
                            <option key={u._id} value={u._id}>
                              {u.username}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={editData[col.key] || ""}
                          onChange={(e) => handleInputChange(e, col.key)}
                          className="w-full p-2 border rounded"
                        />
                      )
                    ) : col.render ? (
                      col.render(item)
                    ) : col.key === "user" ? (
                      item.user?.username || "N/A"
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 flex justify-evenly">
                  {editingId === item._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-gray-500 text-white px-5 py-1 rounded mr-2 hover:bg-gray-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-white text-gray-500 border border-gray-500 px-4 py-1 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(item)}>
                        <PencilLine className="cursor-pointer bg-blue-500 text-white p-1 rounded hover:bg-blue-600" />
                      </button>
                      <button onClick={() => onDelete(item._id)}>
                        <Trash2 className="cursor-pointer bg-red-500 text-white p-1 rounded hover:bg-red-600" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No {title.toLowerCase()} found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-80"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-80"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
