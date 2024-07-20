import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/slices/productsApiSlice";

const ProductCategory = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [name, setName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const {
    data: categories,
    isLoading,
    refetch: refetchCategories,
    error,
  } = useGetCategoriesQuery();
  const [addCategory, { isLoading: loadingAddCategory }] =
    useAddCategoryMutation();
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await addCategory({ name, setSubCategoryName });
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Category Added Successfully");
      refetchCategories();
      setShowAddCategory(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category Deleted");
        refetchCategories();
      } catch (error) {
        toast.error(error?.data?.message || error?.error || error.message);
      }
    }
  };

  if (deleteLoading) {
    <Loader />;
  }
  return (
    <>
      <h1 className="text-center">Categories</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          type="error"
          message={error?.data?.message || error?.message || error?.error}
        />
      ) : (
        <>
          <div className="overflow-x-auto p-2">
            <table className="md:w-2/3 w-full mx-auto">
              <thead className="bg-[#51b7d5] text-white border-b">
                <tr>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#51b7d5] hover:text-white"
                    >
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="bg-red-400 text-white p-2 rounded-[4px] border-none"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr></tr>
              </tbody>
            </table>

            <button
              className="bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none block ml-auto mt-3"
              onClick={() => {
                setShowAddCategory(true);
              }}
            >
              Add Category
            </button>
          </div>

          {showAddCategory && (
            <form
              className="flex flex-col items-center gap-y-4 mb-[5rem]"
              onSubmit={handleSubmitHandler}
            >
              <div className="flex flex-col gap-y-3 md:w-2/6">
                <label className="font-[600]">Enter Category Name</label>
                <input
                  className="p-2 outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id=""
                  required
                />
              </div>
              <div className="flex flex-col gap-y-3 md:w-2/6">
                <label className="font-[600]">Enter Sub Category</label>
                <input
                  className="p-2 outline-none"
                  type="text"
                  value={subCategoryName}
                  onChange={(e) => {
                    setSubCategoryName(e.target.value);
                  }}
                  id=""
                />
              </div>
              {loadingAddCategory && <Loader />}
              <div>
                <input
                  className="bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none"
                  type="submit"
                  value="Add Category"
                />
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ProductCategory;
