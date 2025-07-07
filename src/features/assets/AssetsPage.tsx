import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { api } from "@/lib/api";
interface Asset {
  AssetId: number;
  Name: string;
  Shortname: string;
  AssetCategory: number;
  AssetCategoryName: string;
  Unit: number;
  Description: string;
}
interface TypeTableRes {
  pagination: Pagination;
  status: string;
  message: string;
  results: unknown[];
}
interface AssetResponse extends TypeTableRes {
  results: Asset[];
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}
interface TypeCatgRes extends TypeTableRes {
  results: Category[];
}
interface Category {
  id: number;
  name: string;
}

const ASSETS_URL = "/assets/";

const Action = ({
  assetId,
  fetchAssets,
  onEditClick,
}: {
  assetId: number;
  fetchAssets: () => void;
  onEditClick: (assetId: number) => void;
}) => {
  const [showData, setShowData] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeData = () => setShowData(null);
    document.addEventListener("click", closeData);
    return () => {
      document.removeEventListener("click", closeData);
    };
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://asset-management-system-2y9g.onrender.com/api/assets/${assetId}/`
      );
      window.alert("Asset deleted successfully");
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
      window.alert("Failed to delete asset");
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowData(showData === assetId ? null : assetId);
        }}
        className="cursor-pointer p-2 hover:bg-gray-200 rounded-full"
      >
        <BsThreeDotsVertical />
      </div>

      {showData && (
        <div className="absolute right-0 mt-2 w-20 bg-white border rounded-lg shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-1 text-green-400 hover:bg-gray-100 "
            onClick={() => navigate(`/assets-details/${assetId}`)}
          >
            View
          </button>
          <button
            className="block w-full text-left px-4 py-1 text-blue-400 hover:bg-gray-100"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEditClick(assetId);
              setShowData(null);
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-1 text-red-400 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default function Assets() {
  const [showForm, setShowForm] = useState(false);
  const [assetData, setAssetData] = useState<Asset[]>([]);
  const [CategoryData, setCategoryData] = useState<Category[]>([]);
  const [searchData, setSearchData] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";

  const [pagination, setPagination] = useState<Pagination>({
    current_page: page ? parseInt(page) : 1,
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Asset>({
    AssetId: 0,
    Name: "",
    Shortname: "",
    AssetCategory: 0,
    AssetCategoryName: "",
    Unit: 0,
    Description: "",
  });

  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [rowEditData, setRowEditData] = useState<Partial<Asset>>({});

  const fetchAssets = useCallback(async () => {
    try {
      const { data }: { data: AssetResponse } = await api.get(
        ASSETS_URL + `?page=${page}`
      );

      setAssetData(data.results);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const fetchCategories = async () => {
    try {
      const { data }: { data: TypeCatgRes } = await api.get("/categories/");
      setCategoryData(data.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Unit" || name === "AssetId" || name === "AssetCategory"
          ? Number(value)
          : value,
    }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       Name: formData.Name,
  //       Shortname: formData.Shortname,
  //       Description: formData.Description,
  //       Unit: String(formData.Unit),
  //       AssetCategory: formData.AssetCategory,
  //     };

  //     const url = formData.AssetId
  //       ? `${ASSETS_URL}${formData.AssetId}/`
  //       : ASSETS_URL;

  //     const method = formData.AssetId ? "PUT" : "POST";

  //     const response = await fetch(url, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) throw new Error("Failed to save data");

  //     await fetchAssets();
  //     resetForm();
  //   } catch (error) {
  //     console.error("Error saving asset:", error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const payload = {
        Name: formData.Name,
        Shortname: formData.Shortname,
        Description: formData.Description,
        Unit: String(formData.Unit),
        AssetCategory: formData.AssetCategory,
      };

      if (formData.AssetId) {
        // Update
        await api.put(`/assets/${formData.AssetId}/`, payload);
      } else {
        // Create
        await api.post("/assets/", payload);
      }

      await fetchAssets();
      resetForm();
    } catch (error) {
      console.error("Error saving asset:", error);
    }
  };
  const resetForm = () => {
    setFormData({
      AssetId: 0,
      Name: "",
      Shortname: "",
      AssetCategory: 0,
      AssetCategoryName: "",
      Unit: 0,
      Description: "",
    });
    setEditingRowId(null);
    setShowForm(false);
  };

  const nextPage = () => {
    if (!pagination.has_next) return;
    const nPage = pagination.current_page + 1;
    navigate(`/assets?page=${nPage}`);
  };

  const prevPage = () => {
    if (!pagination.has_previous) return;
    const nPage = pagination.current_page - 1;
    navigate(`/assets?page=${nPage}`);
  };

  const filterData = assetData.filter((asset) =>
    `${asset.Name} ${asset.Shortname}`
      .toLowerCase()
      .includes(searchData.toLowerCase())
  );
  const pageSize = 10;

  // useEffect(() => {
  // const fetchCategory = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://asset-management-system-2y9g.onrender.com/api/categories/"
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data: TypeCatgRes = await response.json();
  //     console.log("Fetched users:", data);
  //     setCategoryData(data?.results);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const fetchCategory = async () => {
    try {
      const { data }: { data: TypeCatgRes } = await api.get("/categories/");
      setCategoryData(data.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // }, []);
  // Determine if the form is in editing mode
  const isEditing = formData.AssetId !== 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-full bg-white shadow"
            >
              <IoArrowBack className="text-2xl text-black-500 font-light" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-teal-500 mb-4 sm:mb-0">
            Assets
          </h1>
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <CiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
              fetchCategory();
            }}
            className="text-white bg-teal-500 px-4 py-2 rounded-lg text-sm hover:bg-teal-600"
          >
            {showForm ? "Cancel" : "Add Asset"}
          </button>
        </div>

        {showForm && (
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Asset" : "Add New Asset"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  className="w-full border border-teal-500 p-2 rounded-lg"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  name="Shortname"
                  placeholder="Short Name"
                  className="w-full border border-teal-500 p-2 rounded-lg"
                  value={formData.Shortname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="Description"
                  placeholder="Description"
                  className="w-full border border-teal-500 p-2 rounded-lg"
                  value={formData.Description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Asset Category
                </label>
                <select
                  name="AssetCategory"
                  value={formData.AssetCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prev) => ({
                      ...prev,
                      AssetCategory: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-teal-500 p-2 rounded-lg"
                >
                  <option value="">Select a Category</option>
                  {Array.isArray(CategoryData) &&
                    CategoryData.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={handleSubmit}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-400 text-white">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Asset ID
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Short Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Asset Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {filterData.length > 0 ? (
                filterData.map((asset, index) => (
                  // filterData.map((asset, index) => (
                  <tr
                    key={asset.AssetId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {(pagination.current_page - 1) * pageSize + index + 1}
                    </td>
                    {editingRowId === asset.AssetId ? (
                      <>
                        <td className="px-6 py-4 text-sm">
                          <input
                            type="text"
                            value={rowEditData.Name ?? asset.Name}
                            onChange={(e) =>
                              setRowEditData((d) => ({
                                ...d,
                                Name: e.target.value,
                              }))
                            }
                            className="border p-1 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <input
                            type="text"
                            value={rowEditData.Shortname ?? asset.Shortname}
                            onChange={(e) =>
                              setRowEditData((d) => ({
                                ...d,
                                Shortname: e.target.value,
                              }))
                            }
                            className="border p-1 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm ">
                          <input
                            type="text"
                            value={rowEditData.Description ?? asset.Description}
                            onChange={(e) =>
                              setRowEditData((d) => ({
                                ...d,
                                Description: e.target.value,
                              }))
                            }
                            className="border p-1 rounded"
                            //line-clamp-2 leading-5
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <input
                            type="number"
                            value={rowEditData.Unit ?? asset.Unit}
                            onChange={(e) =>
                              setRowEditData((d) => ({
                                ...d,
                                Unit: Number(e.target.value),
                              }))
                            }
                            className="border p-1 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={
                              rowEditData.AssetCategory ?? asset.AssetCategory
                            }
                            onChange={(e) =>
                              setRowEditData((d) => ({
                                ...d,
                                AssetCategory: Number(e.target.value),
                              }))
                            }
                            className="border p-1 rounded"
                          >
                            <option value="">Select a Category</option>
                            {Array.isArray(CategoryData) &&
                              CategoryData.map((category: Category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            className="bg-teal-500 text-white px-2 py-1 rounded"
                            onClick={async () => {
                              try {
                                await api.put(`/assets/${asset.AssetId}/`, {
                                  ...asset,
                                  ...rowEditData,
                                  Unit: String(rowEditData.Unit ?? asset.Unit),
                                });
                                setEditingRowId(null);
                                setRowEditData({});
                                fetchAssets();
                              } catch {
                                alert("Failed to update asset");
                              }
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-400 text-white px-2 py-1 rounded"
                            onClick={() => {
                              setEditingRowId(null);
                              setRowEditData({});
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-teal-500 font-semibold" onClick={()=>navigate(`/assets-details/${ asset.AssetId}`)}>
                      
                          {asset.Name}
                        </td>
                        <td className="px-6 py-4 text-sm">{asset.Shortname}</td>
                        <td className="px-5 py-1 text-sm line-clamp-1 leading-7">
                          {asset.Description}
                        </td>
                        <td className="px-6 py-4 text-sm">{asset.Unit}</td>
                        <td className="px-6 py-4 text-sm">
                          {asset.AssetCategoryName}
                        </td>
                        <td className="px-6 py-4 text-sm relative flex gap-2">
                          <Action
                            assetId={asset.AssetId}
                            fetchAssets={fetchAssets}
                            onEditClick={(id: number) => {
                              setEditingRowId(id);
                              setRowEditData(asset);
                              fetchCategory();
                            }}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">
            Page {pagination.current_page}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={!pagination.has_previous}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_previous
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-teal-600 text-white opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!pagination.has_next}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                pagination.has_next
                  ? "bg-teal-500 text-white hover:bg-teal-700"
                  : "bg-teal-600 text-white opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
