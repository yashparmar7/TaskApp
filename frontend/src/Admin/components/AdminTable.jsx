import { PlusCircle, PencilLine, Trash2, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

const AdminTable = ({ title, columns, data, onEdit, onDelete, onAdd }) => {
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

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-600 font-bold">{title}</h1>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            <PlusCircleIcon className="mr-2" /> Add {title.slice(0, -1)}
          </button>
        )}
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
          {data.map((item) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
