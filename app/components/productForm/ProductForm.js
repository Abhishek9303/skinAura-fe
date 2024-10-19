import { useState, useEffect } from "react";
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
  });
  const [loading, setLoading] = useState(false);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        mainImage: null,
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
    if (name === "images") {
      const removedImage = formData.images[index];
      setRemovedImages((prev) => [...prev, removedImage]); // Track removed images
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((_, i) => i !== index),
    }));
  };

  const handleRemoveTag = (tag) => {
    setRemovedTags((prev) => [...prev, tag]); // Track removed tags
    setFormData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((t) => t !== tag),
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

    // Append removedImages and removedTags to the form data
    if (removedImages.length > 0) {
      removedImages.forEach((image) => data.append("removedImages", image));
    }
    if (removedTags.length > 0) {
      removedTags.forEach((tag) => data.append("removedTags", tag));
    }

    try {
      let response;
      if (editingProduct) {
        const productId = editingProduct._id; // Get the product ID from the editingProduct
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
                className="mt-1 block w-full"
                required
              />
            </div>

            {/* Other fields */}
            {/* Add other missing fields from your schema similarly */}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
