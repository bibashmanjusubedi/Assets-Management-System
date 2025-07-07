import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { api } from "@/lib/api";

interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  pagination: Pagination;
  status: string;
  message: string;
  results: Category[];
}

interface Pagination {
  current_page: number;
  has_next?: boolean;
  has_previous?: boolean;
  total_items?: number;
  total_pages?: number;
}

const CATEGORY_URL = "/categories/";

export default function Categories() {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<Pagination>({
    current_page: page ? parseInt(page) : 1,
  });
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Edit state
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Add category inline form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addError, setAddError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const { data }: { data: CategoryResponse } = await api.get(
        CATEGORY_URL + `?page=${page}`
      );
      setCategoryData(data.results);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const nextPage = () => {
    if (!pagination.has_next) return;
    const nPage = pagination.current_page + 1;
    navigate(`/categories?page=${nPage}`);
  };

  const prevPage = () => {
    if (!pagination.has_previous) return;
    const nPage = pagination.current_page - 1;
    navigate(`/categories?page=${nPage}`);
  };

  const filteredCategory = categoryData.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Edit handlers
  const startEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditName(category.name);
    setOpenMenu(null);
  };

  const cancelEdit = () => {
    setEditingCategoryId(null);
    setEditName("");
  };

  const saveEdit = async (categoryId: number) => {
    try {
      await api.put(`/categories/${categoryId}/`, { name: editName });
      setEditingCategoryId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete handler
  const deleteCategory = async (categoryId: number) => {
    setOpenMenu(null);
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/categories/${categoryId}/`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Add category handler
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!newCategoryName.trim()) {
      setAddError("Category name is required.");
      return;
    }
    try {
      await api.post("/categories/", { name: newCategoryName.trim() });
      setShowAddForm(false);
      setNewCategoryName("");
      fetchCategories();
} catch (error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: unknown }).response !== null &&
    "data" in (error as { response: Record<string, unknown> }).response
  ) {
    const errData = (error as { response: { data: { name?: string[]; detail?: string } } }).response.data;
    setAddError(
      errData.name?.[0] ||
      errData.detail ||
      "Failed to add category."
    );
  } else {
    setAddError("Failed to add category.");
  }
}
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Add Category Inline Form */}
        <div className="flex justify-end mb-4">
          {!showAddForm ? (
            <button
              onClick={() => {
                setShowAddForm(true);
                setNewCategoryName("");
                setAddError("");
              }}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              Add Category
            </button>
          ) : (
            <form
              onSubmit={handleAddCategory}
              className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto"
            >
              <input
                type="text"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border px-3 py-2 rounded mb-2 sm:mb-0"
                autoFocus
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategoryName("");
                  setAddError("");
                }}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              {addError && (
                <span className="text-red-500 text-sm ml-2">{addError}</span>
              )}
            </form>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-1">
          <div className="flex items-center ">
            <button
              onClick={() => navigate("/")}
              className="mr-4 p-2 rounded-full bg-white shadow"
            >
              <IoArrowBack className="text-2xl text-black-500 font-light" />
            </button>
            <h1 className="text-2xl font-semibold text-teal-600 mb-4 absolute left-1/2 transform -translate-x-1/2">
              Categories
            </h1>
          </div>

          <div className="relative w-full sm:w-64 shadow-md rounded-lg text-lg">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
            <CiSearch className="absolute left-3 top-3  text-lg" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <thead className="text-white bg-teal-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categoryData) && filteredCategory.map((category) => (
                <tr key={category.id} className="border-b hover:bg-blue-50 ">
                  <td className="px-6 py-4">{category.id}</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded"
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(
                            openMenu === category.id ? null : category.id
                          );
                        }}
                        className="text-black focus:outline-none"
                      >
                        <BsThreeDotsVertical className="" />
                      </button>
                      {openMenu === category.id && (
                        <div className="absolute left-0 mt-1 w-24 rounded shadow z-10 bg-white border text-xs ">
                          {editingCategoryId === category.id ? (
                            <>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-green-600"
                                onClick={() => saveEdit(category.id)}
                              >
                                Save
                              </button>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                                onClick={cancelEdit}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                                onClick={() => {
                                  // Placeholder for view logic
                                  setOpenMenu(null);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                                onClick={() => startEdit(category)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
                                onClick={() => deleteCategory(category.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
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
}