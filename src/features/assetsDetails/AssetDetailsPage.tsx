import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical, BsCheck, BsX } from "react-icons/bs";
import { api } from "@/lib/api";

interface AssetDetails {
  Sn: number;
  Asset: number;
  AssetName: string;
  AssetCode: string;
  Price: number;
  PurchaseDate: string;
  Remarks: string;
  Status: string;
}

interface Pagination {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  total_items?: number;
  total_pages?: number;
}

interface AssetDetailsResponse {
  pagination: Pagination;
  status: string;
  message: string;
  results: AssetDetails[];
}

const AssetDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState("");
  const pageParam = queryParams.get("page") || "1";
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const filterName = queryParams.get("name") || "";

  const [assetData, setAssetData] = useState<AssetDetails[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    has_next: false,
    has_previous: false,
  });
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<AssetDetails>>({});
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<number | null>(null);

  const fetchAssets = useCallback(async () => {
    try {
      const { data }: { data: AssetDetailsResponse } = await api.get(
        `/asset-details/?page=${currentPage}`
      );
      
      const filtered = filterName
        ? data.results.filter(asset =>
            asset.AssetName.toLowerCase().includes(filterName.toLowerCase())
          )
        : data.results;
      setAssetData(filtered);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching asset details:", error);
    }
  }, [currentPage, filterName]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const nextPage = () => {
    if (!pagination.has_next) return;
    const nextPage = pagination.current_page + 1;
    navigate(`/assets-details?page=${nextPage}${filterName ? `&name=${encodeURIComponent(filterName)}` : ""}`);
  };

  const prevPage = () => {
    if (!pagination.has_previous) return;
    const prevPage = pagination.current_page - 1;
    navigate(`/assets-details?page=${prevPage}${filterName ? `&name=${encodeURIComponent(filterName)}` : ""}`);
  };

  const handleViewDetails = (assetId: number) => {
    navigate(`/assets-details/${assetId}`);
  };

  const startEditing = (asset: AssetDetails) => {
    setEditingId(asset.Sn);
    setEditData({ ...asset });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof AssetDetails
  ) => {
    setEditData({
      ...editData,
      [field]: e.target.value,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEditing = async (assetId: number) => {
    try {
      const { data } = await api.put(
        `/asset-details/${assetId}/`,
        editData
      );
      setAssetData(
        assetData.map((asset) =>
          asset.Sn === assetId ? { ...asset, ...data } : asset
        )
      );
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const handleDelete = async (assetId: number) => {
    try {
      await api.delete(`/asset-details/${assetId}/`);
      setAssetData(assetData.filter((asset) => asset.Sn !== assetId));
      setIsDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const filteredAssets = assetData.filter((asset) =>
    asset.AssetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      {openMenu && (
        <div
          onClick={() => setOpenMenu(null)}
          className="fixed inset-0 h-full w-screen bg-white/20"
        />
      )}

      <div className="min-h-screen bg-gray-50 p-1">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 ">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-full bg-white shadow"
            >
              <IoArrowBack className="text-2xl text-black-500 font-light " />
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-teal-600 mb-4 ">
            Assets Details
          </h1>
          <div className="relative w-full sm:w-64 shadow-md rounded-lg text-lg">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <CiSearch className="absolute left-3 top-3  text-lg" />
          </div>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg m-4">
          <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
            <thead className="bg-teal-500 text-white ">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500 text-lg">
                    No assets found
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.Sn}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm ">
                      {editingId === asset.Sn ? (
                        <input
                          type="number"
                          value={editData.Asset ?? asset.Asset}
                          onChange={(e) => handleEditChange(e, "Asset")}
                          className="border rounded px-2 py-1 w-20"
                        />
                      ) : (
                        asset.Asset
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm  text-teal-600 font-semibold">
                      {editingId === asset.Sn ? (
                        <input
                          type="text"
                          value={editData.AssetName ?? asset.AssetName}
                          onChange={(e) => handleEditChange(e, "AssetName")}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        asset.AssetName
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === asset.Sn ? (
                        <input
                          type="text"
                          value={editData.AssetCode ?? asset.AssetCode}
                          onChange={(e) => handleEditChange(e, "AssetCode")}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        asset.AssetCode
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === asset.Sn ? (
                        <input
                          type="number"
                          value={editData.Price ?? asset.Price}
                          onChange={(e) => handleEditChange(e, "Price")}
                          className="border rounded px-2 py-1 w-20"
                        />
                      ) : (
                        asset.Price.toLocaleString()
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === asset.Sn ? (
                        <input
                          type="date"
                          value={editData.PurchaseDate ?? asset.PurchaseDate}
                          onChange={(e) => handleEditChange(e, "PurchaseDate")}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        asset.PurchaseDate
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === asset.Sn ? (
                        <input
                          type="text"
                          value={editData.Remarks ?? asset.Remarks}
                          onChange={(e) => handleEditChange(e, "Remarks")}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        asset.Remarks
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === asset.Sn ? (
                        <select
                          value={editData.Status ?? asset.Status}
                          onChange={(e) => handleEditChange(e, "Status")}
                          className="border rounded px-2 py-1"
                        >
                          <option value="working">working</option>
                          <option value="not working">not working</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            asset.Status === "working"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {asset.Status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm relative">
                      {editingId === asset.Sn ? (
                        <div className="flex flex-nowrap items-center gap-1 z-20 relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveEditing(asset.Sn);
                            }}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Save"
                            style={{ zIndex: 30, position: "relative" }}
                          >
                            <BsCheck className="text-lg" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Cancel"
                            style={{ zIndex: 30, position: "relative" }}
                          >
                            <BsX className="text-lg" />
                          </button>
                        </div>
                      ) : isDeleteConfirm === asset.Sn ? (
                        <div className="flex flex-col space-y-1 text-xs">
                          <span>Are you sure?</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(asset.Sn)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setIsDeleteConfirm(null)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(
                                openMenu === asset.Sn ? null : asset.Sn
                              );
                            }}
                            className="text-black focus:outline-none"
                          >
                            <BsThreeDotsVertical className="" />
                          </button>
                          {openMenu === asset.Sn && (
                            <div className="absolute right-0 mt-1 min-w-[100px] rounded shadow z-10 bg-white border text-xs">
                              <button
                                onClick={() => {
                                  handleViewDetails(asset.Asset);
                                  setOpenMenu(null);
                                }}
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  startEditing(asset);
                                  setOpenMenu(null);
                                }}
                                className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setIsDeleteConfirm(asset.Sn);
                                  setOpenMenu(null);
                                }}
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 ">
          <div className="text-sm ">Page {pagination.current_page}</div>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={!pagination.has_previous}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_previous
                  ? "bg-blue-600 text-white hover:bg-gray-50"
                  : "bg-teal-500 text-white "
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!pagination.has_next}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_next
                  ? "bg-blue-600 text-white hover:bg-gray-50"
                  : "bg-teal-500  text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;