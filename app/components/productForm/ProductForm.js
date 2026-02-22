import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiCloseLine, RiImageAddLine, RiPriceTag3Line, RiInformationLine, RiDeleteBinLine, RiStarLine, RiPaletteLine } from "@remixicon/react";
import Button from "@/app/components/button/Button";

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
    if (e) e.preventDefault();
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

  const InputWrapper = ({ label, icon: Icon, children }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest ml-1">
        {Icon && <Icon size={14} className="text-[#DF9D43]" />}
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#6A4D6F]/20 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <div>
            <p className="text-[#DF9D43] font-juanaMedium uppercase tracking-[0.3em] text-[10px] mb-2">Inventory Dashboard</p>
            <h2 className="text-3xl font-juanaBold text-[#6A4D6F]">
              {editingProduct ? "Edit Product" : "New Collection Item"}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Essential Data */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWrapper label="Product Identity" icon={RiInformationLine}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="E.g. Radiance Serum"
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all"
                    required 
                  />
                </InputWrapper>
                <InputWrapper label="Category" icon={RiPriceTag3Line}>
                  <input 
                    type="text" 
                    name="category" 
                    placeholder="Skin Care"
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all"
                    required 
                  />
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputWrapper label="Base Price (₹)" icon={RiPriceTag3Line}>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all"
                    required 
                  />
                </InputWrapper>
                <InputWrapper label="Discount (%)" icon={RiPriceTag3Line}>
                  <input 
                    type="number" 
                    name="discount" 
                    value={formData.discount} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all"
                  />
                </InputWrapper>
                <InputWrapper label="Rating" icon={RiStarLine}>
                  <input 
                    type="number" 
                    name="rating" 
                    value={formData.rating} 
                    onChange={handleInputChange} 
                    min="0" max="5" step="0.1"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all"
                  />
                </InputWrapper>
              </div>

              <InputWrapper label="Aesthetic Color" icon={RiPaletteLine}>
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    name="backgroundColor" 
                    value={formData.backgroundColor} 
                    onChange={handleInputChange} 
                    className="w-16 h-14 rounded-xl border-none p-1 bg-gray-50 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={formData.backgroundColor}
                    readOnly
                    className="bg-gray-50 rounded-xl px-4 py-2 font-mono text-xs text-gray-400"
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Detailed Description" icon={RiInformationLine}>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="5"
                  className="w-full bg-gray-50 border border-transparent rounded-2xl p-4 font-sans text-sm focus:bg-white focus:ring-2 focus:ring-[#6A4D6F]/10 outline-none transition-all resize-none"
                  placeholder="Tell the brand story of this product..."
                />
              </InputWrapper>
            </div>

            {/* Right Column: Media Assets */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-[2rem] bg-gray-50/50 border border-gray-100 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Visual Assets</h3>
                  <RiImageAddLine size={18} className="text-[#6A4D6F]" />
                </div>

                {/* Main Image Upload */}
                <div className="space-y-4">
                  <p className="text-[9px] font-juanaBold text-gray-400 uppercase">Primary Feature Image</p>
                  <div className="relative group">
                    {formData.mainImagePreview ? (
                      <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-md">
                        <img src={formData.mainImagePreview} alt="Primary" className="w-full h-full object-cover" />
                        <button 
                          onClick={handleRemoveMainImage}
                          className="absolute top-4 right-4 bg-white/90 p-2 rounded-xl text-red-500 shadow-lg hover:scale-110 transition-transform"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-square w-full rounded-[2.5rem] border-2 border-dashed border-gray-200 hover:border-[#6A4D6F]/30 hover:bg-[#6A4D6F]/5 transition-all cursor-pointer">
                        <RiImageAddLine size={48} className="text-gray-300 mb-4" />
                        <span className="text-[10px] font-juanaBold text-gray-400 uppercase tracking-widest">Click to upload main image</span>
                        <input type="file" name="mainImage" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Gallery Upload */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-juanaBold text-gray-400 uppercase">Gallery Showcase</p>
                    <label className="cursor-pointer text-[#6A4D6F] hover:text-[#DF9D43] transition-colors">
                      <RiImageAddLine size={20} />
                      <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {formData.imagePreviews.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                        <img src={src} alt="Gallery" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => handleRemoveImage(index)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                        >
                          <RiDeleteBinLine size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-end gap-6 bg-white z-10 sticky bottom-0">
          <button
            onClick={onClose}
            className="text-[10px] font-juanaBold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Cancel Draft
          </button>
          <Button 
            text={editingProduct ? "Update Collection" : "Publish Product"}
            onClick={handleSubmit}
            className="!px-12 !py-4 rounded-2xl shadow-xl shadow-[#6A4D6F]/20 uppercase tracking-widest text-xs md:text-sm font-sans font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

