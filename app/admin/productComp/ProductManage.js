import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/productForm/ProductForm";
import DeleteConfirmationModal from "../../components/deleteConfirm/DeleteConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Retrieve the auth token from local storage
  const authToken = localStorage.getItem('token'); // Replace with your actual token key

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}api/v1/common/getProduct`,
        {
          headers: { "auth-token": authToken },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    console.log('onconfirm', productToDelete);
    try {
      await axios.delete(
        `${process.env.BACKEND_URL}api/v1/admin/deleteProduct?productId=${productToDelete}`,
        {
          headers: { "auth-token": authToken },
        }
      );
      fetchProducts(); // Refresh product list
      toast.success("Product deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product!"); // Show error toast
    } finally {
      setShowDeleteModal(false); // Close modal after operation
      setProductToDelete(null); // Clear the product to delete
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Include the ToastContainer */}
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 bg-blue-600 text-white p-2 rounded-md"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product._id} className="border rounded-md p-4">
            {product.mainImage && (
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded" // Adjust the height as needed
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="mb-4">Price: ${product.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => {handleDelete(product._id)}}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ProductForm
          onClose={() => setShowModal(false)}
          authToken={authToken} // Pass the auth token
          setProducts={setProducts}
          editingProduct={editingProduct}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ManageProduct;
