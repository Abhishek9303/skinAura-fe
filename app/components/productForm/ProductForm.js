import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ onClose, setProducts, editingProduct }) => {
  const authToken = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    mainImage: null,
    images: [],
    backgroundColor: "",
    certificates: [],
    discount: 0,
    tags: [],
    inStock: true,
    rating: 0,
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        mainImage: null, // Ensure we re-upload the main image if editing
        tags: editingProduct.tags || [],
        images: editingProduct.images || [],
        certificates: editingProduct.certificates || [],
      });
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images" || name === "certificates") {
      const newFiles = Array.from(files).filter((file) => file instanceof File);
      setFormData((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], ...newFiles],
      }));
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleRemoveFile = (name, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((_, i) => i !== index),
    }));
  };

  const handleRemoveMainImage = () => {
    setFormData({ ...formData, mainImage: null });
  };

  const handleAddTag = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      setFormData((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, ...newTags],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    // Append form data
    for (const key in formData) {
      if (key === "images" || key === "certificates") {
        formData[key].forEach((file) => {
          data.append(key, file);
        });
      } else if (key === "mainImage" && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else if (key === "tags" && formData[key]?.length > 0) {
        formData[key].forEach((tag) => data.append(key, tag));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      let response;
      if (editingProduct) {
        const productId = editingProduct._id;
        response = await axios.put(
          `${process.env.BACKEND_URL}admin/updateProduct?productId=${productId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": authToken,
            },
          }
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        toast.success("Product updated successfully!");
      } else {
        response = await axios.post(
          `${process.env.BACKEND_URL}api/v1/admin/createNewProduct`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": authToken,
            },
          }
        );
        setProducts((prevProducts) => [...prevProducts, response.data]);
        toast.success("Product created successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to submit product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 border w-full max-w-5xl shadow-lg rounded-md bg-white flex flex-col max-h-[90vh] overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ❌
        </button>
        <div className="flex-1 overflow-y-auto max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-[50vw] px-2 py-1 border"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-[50vw] px-2 py-1 border"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-[50vw] px-2 py-1 border appearance-none"
                required
              />
            </div>
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium">
                Background Color
              </label>
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                className="mt-1 block w-full"
              />
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium">Main Image</label>
              {formData.mainImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(formData.mainImage)}
                    alt="Main"
                    className="h-20 w-20 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    onClick={handleRemoveMainImage}
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Choose Main Image
                </button>
                <input
                  type="file"
                  name="mainImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium">Images</label>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Choose Images
                </button>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      // src={URL?.createObjectURL(file)}
                      alt={`Image ${index}`}
                      className="h-20 w-20 object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => handleRemoveFile("images", index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <label className="block text-sm font-medium">Certificates</label>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Choose Certificates
                </button>
                <input
                  type="file"
                  name="certificates"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.certificates.map((file, index) => (
                  <div key={index} className="relative">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => handleRemoveFile("certificates", index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium">Tags</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Press ',' or 'Enter' to add"
                className="mt-1 block w-full"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-xs"
                      onClick={() => handleRemoveTag(index)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
