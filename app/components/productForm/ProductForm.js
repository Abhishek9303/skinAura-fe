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
    mainImagePreview: null,
    images: [],
    imagePreviews: [],
    backgroundColor: "#ffffff",
    certificates: [],
    discount: 0,
    tags: [],
    inStock: true,
    rating: 0,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        mainImage: null,
        mainImagePreview: editingProduct.mainImage || null,
        images: [],
        imagePreviews: editingProduct.images || [],
        certificates: editingProduct.certificates || [],
        tags: editingProduct.tags || [],
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
    if (name === "images") {
      const newFiles = Array.from(files);
      const previews = newFiles.map((file) => URL.createObjectURL(file));
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newFiles],
        imagePreviews: [...prevState.imagePreviews, ...previews],
      }));
    } else if (name === "mainImage") {
      setFormData({
        ...formData,
        mainImage: files[0],
        mainImagePreview: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleRemoveImage = (index) => {
   
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
      imagePreviews: prevState.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveMainImage = () => {
    setFormData({
      ...formData,
      mainImage: null,
      mainImagePreview: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((file) => data.append(key, file));
      } else if (key === "mainImage" && formData[key]) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      let response;
      if (editingProduct) {
        response = await axios.put(
          `${process.env.BACKEND_URL}api/v1/admin/updateProduct?productId=${editingProduct._id}`,
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
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="relative p-6 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">❌</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">Product Name
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input w-full mt-1" required />
            </label>
            <label className="block">Price
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="input w-full mt-1" required />
            </label>
            <label className="block">Category
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="input w-full mt-1" required />
            </label>
            <label className="block">Discount (%)
              <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} className="input w-full mt-1" />
            </label>
            <label className="block">Rating (0-5)
              <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" step="0.1" className="input w-full mt-1" />
            </label>
            <label className="block">Background Color
              <input type="color" name="backgroundColor" value={formData.backgroundColor} onChange={handleInputChange} className="input w-full mt-1" />
            </label>
            <label className="block">Description
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="input w-full mt-1" />
            </label>
            <label className="block">Main Image
              <input type="file" name="mainImage" accept="image/*" onChange={handleFileChange} className="input w-full mt-1" />
            </label>
            <label className="block">Additional Images
              <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} className="input w-full mt-1" />
            </label>

            <button type="submit" className="btn w-full">Submit</button>
          </form>

          {/* Right: Image Previews */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold mb-2">Selected Images</h3>

            {formData.mainImagePreview && (
              <div className="relative mb-2">
                <img src={formData.mainImagePreview} alt="Main Preview" className="w-24 h-24 object-cover rounded-md" />
                <button onClick={handleRemoveMainImage} className="absolute -top-2 -right-2 text-white bg-red-500 p-1 rounded-full">❌</button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              {formData.imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
                  <button onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 text-white bg-red-500 p-1 rounded-full">❌</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
