import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { api } from "@/lib/api";

interface Row {
  id: number;
  Outdate: string;
  DateToReturn: string;
  ReturnDate: string;
  Remarks: string;
  AssetDetail: string;
  OutTo: string;
}

interface Asset {
  Asset: number;
  AssetCode: string;
  AssetName: string;
}

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}

// --- Helper functions ---
function getUserName(userId: string | number, users: User[]) {
  const user = users.find((u) => String(u.id) === String(userId));
  return user
    ? `${user.first_name} ${user.last_name}`.trim() || user.username
    : String(userId);
}

function getAssetCode(assetId: string | number, assets: Asset[]) {
  const asset = assets.find((a) => String(a.Asset) === String(assetId));
  return asset ? asset.AssetCode : String(assetId);
}

const ASSET_OUT_URL = "/asset-out/";
const ASSET_DETAILS_URL = "/asset-details/";
const USERS_URL = "/user/users/";

export default function AssetOutPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ current_page: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    Outdate: "",
    DateToReturn: "",
    ReturnDate: "",
    Remarks: "",
    AssetDetail: "",
    OutTo: "",
  });
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [filteredRows, setFilteredRows] = useState<Row[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Row>>({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const navigate = useNavigate();
  const pageSize = 10;

  // Fetch asset-out rows
  const fetchRows = useCallback(async () => {
    try {
      const { data } = await api.get(ASSET_OUT_URL + `?page=${page}`);
      setRows(
        data.results.map((item: any) => ({
          id: item.Sn,
          Outdate: item.Outdate,
          DateToReturn: item.DateToReturn,
          ReturnDate: item.ReturnDate,
          Remarks: item.Remarks,
          AssetDetail: item.AssetCodeName,
          OutTo: item.OutToName,
        }))
      );
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching asset-out rows:", error);
    }
  }, [page]);

  // Fetch assets
  const fetchAssets = useCallback(async () => {
    try {
      const { data } = await api.get(ASSET_DETAILS_URL);
      setAssets(data.results);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get(USERS_URL);
      setUsers(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  useEffect(() => {
    fetchAssets();
    fetchUsers();
  }, [fetchAssets, fetchUsers]);

  // Search filter
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          String(row.OutTo ?? "")
            .toLowerCase()
            .includes(lowerSearch) ||
          String(row.AssetDetail ?? "")
            .toLowerCase()
            .includes(lowerSearch) ||
          String(row.Remarks ?? "")
            .toLowerCase()
            .includes(lowerSearch)
      )
    );
  }, [rows, searchTerm]);

  // Add a new row
  const handleAddRow = async () => {
    if (
      !formData.OutTo ||
      !formData.Outdate ||
      !formData.DateToReturn ||
      !formData.AssetDetail
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const apiPayload = {
      AssetDetail: Number(formData.AssetDetail),
      OutTo: Number(formData.OutTo),
      Outdate: formData.Outdate,
      DateToReturn: formData.DateToReturn,
      ReturnDate: formData.ReturnDate,
      Remarks: formData.Remarks,
    };

    try {
      const { data: newRow } = await api.post(ASSET_OUT_URL, apiPayload);
      newRow.OutTo = getUserName(newRow.OutTo, users);
      newRow.AssetDetail = getAssetCode(newRow.AssetDetail, assets);

      setRows([...rows, newRow]);
      setFormData({
        Outdate: "",
        DateToReturn: "",
        ReturnDate: "",
        Remarks: "",
        AssetDetail: "",
        OutTo: "",
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    if (!pagination || !pagination.has_next) return;
    const nextPage = pagination.current_page + 1;
    navigate(`/assets-out?page=${nextPage}`);
  };

  const prevPage = () => {
    if (!pagination || !pagination.has_previous) return;
    const prevPage = pagination.current_page - 1;
    navigate(`/assets-out?page=${prevPage}`);
  };

  // Delete row
  const handleDeleteRow = async (id: number) => {
    try {
      await api.delete(`${ASSET_OUT_URL}${id}/`);
      setRows(rows.filter((row) => row.id !== id));
      setOpenMenu(null);
      window.alert("Row deleted successfully.");
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  // Inline edit handlers
  const handleEditRow = (row: Row) => {
    const user = users.find(
      (u) =>
        `${u.first_name} ${u.last_name}`.trim() === row.OutTo ||
        u.username === row.OutTo
    );
    const asset = assets.find((a) => a.AssetCode === row.AssetDetail);

    setEditingId(row.id);
    setEditData({
      ...row,
      OutTo: user ? String(user.id) : "",
      AssetDetail: asset ? String(asset.Asset) : "",
    });
    setOpenMenu(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (editingId === null) return;
    const apiPayload = {
      AssetDetail: Number(editData.AssetDetail),
      OutTo: Number(editData.OutTo),
      Outdate: editData.Outdate,
      DateToReturn: editData.DateToReturn,
      ReturnDate: editData.ReturnDate,
      Remarks: editData.Remarks,
    };
    try {
      const { data: updatedRow } = await api.put(
        `${ASSET_OUT_URL}${editingId}/`,
        apiPayload
      );
      updatedRow.OutTo = getUserName(updatedRow.OutTo, users);
      updatedRow.AssetDetail = getAssetCode(updatedRow.AssetDetail, assets);

      setRows(
        rows.map((row) =>
          row.id === editingId ? { ...row, ...updatedRow } : row
        )
      );
      setEditingId(null);
      setEditData({});
      window.alert("Row updated successfully.");
    } catch (error) {
      alert("Failed to update row.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="bg-white rounded-4xl shadow-lg p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center p-1">
          <div className="flex items-center ">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-full bg-white shadow"
            >
              <IoArrowBack className="text-2xl text-black-500 font-light" />
            </button>
            <h1 className="text-2xl font-semibold text-teal-600 mb-4 absolute left-1/2 transform -translate-x-1/2">
              Asset-out Details
            </h1>
          </div>

          <div className="mt-3 py-2 flex pr-8 justify-end">
            <input
              type="text"
              placeholder=" 🔍Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 text-ellipsis rounded-l-2xl rounded text-sm"
            />
            <CiSearch className="absolute left-3 top-3 text-lg" />
            <button
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="px-4 rounded-r-2xl py-2 flex gap-2 text-slate-50 hover:bg-slate-600 bg-slate-800"
            >
              {isFormOpen ? (
                "Cancel"
              ) : (
                <>
                  <span>➕</span>
                  <span className="hidden md:flex">Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isFormOpen && (
          <div className="bg-white shadow-4xl border-1 border-teal-700 overflow-hidden min-w-[400px] max-w-[800px] mx-auto p-4 ">
            <h3 className="text-lg font-semibold mb-3">Add New Record</h3>
            <div className="flex flex-wrap gap-4">
              {/* Out To Field */}
              <div className="flex-1">
                <label
                  htmlFor="OutTo"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Out To
                </label>
                <select
                  id="OutTo"
                  name="OutTo"
                  value={formData.OutTo}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {`${user.first_name} ${user.last_name}`.trim() ||
                        user.username}
                    </option>
                  ))}
                </select>
              </div>
              {/* Outdate Field */}
              <div className="flex-1">
                <label
                  htmlFor="Outdate"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Outdate
                </label>
                <input
                  type="date"
                  id="Outdate"
                  name="Outdate"
                  value={formData.Outdate}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                />
              </div>
              {/* Date To Return Field */}
              <div className="flex-1">
                <label
                  htmlFor="DateToReturn"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Date To Return
                </label>
                <input
                  type="date"
                  id="DateToReturn"
                  name="DateToReturn"
                  value={formData.DateToReturn}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                />
              </div>
              {/* Return Date Field */}
              <div className="flex-1">
                <label
                  htmlFor="ReturnDate"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Return Date
                </label>
                <input
                  type="date"
                  id="ReturnDate"
                  name="ReturnDate"
                  value={formData.ReturnDate}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                />
              </div>
              {/* Asset Detail Field */}
              <div className="flex-1">
                <label
                  htmlFor="AssetDetail"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Asset Detail
                </label>
                <select
                  id="AssetDetail"
                  name="AssetDetail"
                  value={formData.AssetDetail}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                >
                  <option value="">Select Asset</option>
                  {assets.map((asset) => (
                    <option
                      key={`${asset.Asset}-${asset.AssetCode}`}
                      value={asset.Asset}
                    >
                      {asset.AssetCode}
                    </option>
                  ))}
                </select>
              </div>
              {/* Remarks Field */}
              <div className="flex-1">
                <label
                  htmlFor="Remarks"
                  className="block text-gray-700 text-sm mb-1"
                >
                  Remarks
                </label>
                <input
                  type="text"
                  id="Remarks"
                  name="Remarks"
                  placeholder="Remarks"
                  value={formData.Remarks}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm"
                />
              </div>
            </div>
            <div className="justify-end gap-4 pr-6 mt-4 flex">
              <button
                onClick={handleAddRow}
                className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-blue-500"
              >
                Don't Save
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rounded-3xl">
            <thead className="text-white bg-teal-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">S.N.</th>
                <th className="px-6 py-3">Out To</th>
                <th className="px-6 py-3">Outdate</th>
                <th className="px-6 py-3">Date To Return</th>
                <th className="px-6 py-3">Return Date</th>
                <th className="px-6 py-3">Asset Detail</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <tr
                    key={`${row.id}-${index}`}
                    className="border-b hover:bg-blue-50"
                  >
                    <td className="px-4 py-4">
                      {(pagination.current_page - 1) * pageSize + index + 1}
                    </td>
                    {editingId === row.id ? (
                      <>
                        <td className="px-6 py-4">
                          <select
                            name="OutTo"
                            value={editData.OutTo || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          >
                            <option value="">Select User</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {`${user.first_name} ${user.last_name}`.trim() ||
                                  user.username}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="Outdate"
                            type="date"
                            value={editData.Outdate || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="DateToReturn"
                            type="date"
                            value={editData.DateToReturn || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="ReturnDate"
                            type="date"
                            value={editData.ReturnDate || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            name="AssetDetail"
                            value={editData.AssetDetail || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          >
                            <option value="">Select Asset</option>
                            {assets.map((asset) => (
                              <option
                                key={`${asset.Asset}-${asset.AssetCode}`}
                                value={asset.Asset}
                              >
                                {asset.AssetCode}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            name="Remarks"
                            value={editData.Remarks || ""}
                            onChange={handleEditChange}
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{row.OutTo}</td>
                        <td className="px-6 py-4">{row.Outdate}</td>
                        <td className="px-6 py-4">{row.DateToReturn}</td>
                        <td className="px-6 py-4">{row.ReturnDate}</td>
                        <td className="px-6 py-4">{row.AssetDetail}</td>
                        <td className="px-6 py-4">{row.Remarks}</td>
                        <td className="px-6 py-4 text-sm relative">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(
                                  openMenu === row.id ? null : row.id
                                );
                              }}
                              className="text-black focus:outline-none"
                            >
                              ⋮
                            </button>
                            {openMenu === row.id && (
                              <div className="absolute left-0 mt-1 w-28 bg-white border rounded shadow z-10 text-xs">
                                <button
                                  onClick={() => handleEditRow(row)}
                                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-blue-500"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteRow(row.id)}
                                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center p-4">
          <button
            onClick={prevPage}
            disabled={!pagination?.has_previous}
            className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <p className="text-gray-700">
            Page {pagination?.current_page} of {pagination?.total_pages}
          </p>
          <button
            onClick={nextPage}
            disabled={!pagination?.has_next}
            className="bg-blue-400 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
