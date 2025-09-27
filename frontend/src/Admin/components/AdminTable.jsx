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
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditData({ ...item });
  };

  const handleSave = () => {
    onEdit(editData);
    setEditingId(null);
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
              <th key={col.key} className="px-5 py-4 border">
                {col.label}
              </th>
            ))}
            <th className="px-5 py-4 border">Actions</th>
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
                        <input
                          type="text"
                          value={editData.user?.username || "N/A"}
                          disabled
                          className="w-full p-2 border rounded bg-gray-100"
                        />
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
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                <td className="border-none px-4 py-2 flex justify-evenly">
                  {editingId === item._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-white text-gray-500 border border-gray-500 px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(item)}>
                        <PencilLine className="cursor-pointer bg-blue-500 text-white p-1 rounded" />
                      </button>
                      <button onClick={() => onDelete(item._id)}>
                        <Trash2 className="cursor-pointer bg-red-500 text-white p-1 rounded" />
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

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
