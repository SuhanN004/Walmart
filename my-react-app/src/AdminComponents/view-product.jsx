import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AdminStyles/AdminProducts.css";
import logo from "../assets/walmart-logo.svg";

function ViewProduct() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const  [editName,setEditName]  = useState("");
  const [editPrice,setEditPrice] =  useState("");
  const[editStock,setEditStock] =  useState("");
  const [editDescription, setEditDescription]  = useState("");
  const [editImage, setEditImage] =  useState(null);

  
  const fetchProducts = async () => {
    try {


      const res = await axios.get("http://localhost:5000/api/product/view");
      setProducts(res.data);
    }
    
    catch (err) {
      console.error("Error fetching products:", err);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
      fetchProducts(); 
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };



  const handleEdit = (product) => {

  setEditId(product._id);

  setEditName(product.name);
  setEditPrice(product.price);


  setEditStock(product.stock);

  setEditDescription(product.description);

  setShowEditForm(true);
};




  const handleUpdate = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("name",editName);


    formData.append("price",editPrice);

    formData.append("stock", editStock);
    formData.append("description",editDescription);

    if(editImage){

      formData.append("image", editImage);
    }

    await axios.put(
      `http://localhost:5000/api/product/update/${editId}`,
      formData
    );

    setShowEditForm(false);

    fetchProducts();

  } catch (err) {

    console.error("Error updating product:", err);

  }
};





  
  const searchText = search.toLowerCase();

  const filteredProducts = products.filter(product =>
  
  
    product.name.toLowerCase().includes(searchText)


  );



  return (
    <div className="admin-products">

      <div className="welcome-box">

        <div className="welcome-left">
          <img src={logo} alt="Walmart Logo" className="welcome-logo" />

          <div>
            <h2>Welcome </h2>
            <p>Here's what happening on your store today.</p>
          </div>
        </div>



        <button className="add-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>


        


      </div>


      
      <div className="products-section">

        <div className="products-header">
          <h3>Products</h3>


          <input
          type="text"
          
          placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>



      {filteredProducts.length === 0 && (
        <div className="empty-state">
        No products found.
         </div>
      )}



{filteredProducts.length > 0 && (
  <table>
    <thead>
      <tr>
        <th>PRODUCT</th>
        <th>PRICE</th>
        <th>STOCK</th>
        <th>ACTION</th>
      </tr>
    </thead>



    <tbody>


      {filteredProducts.map((product) => (


        <tr key={product._id}>


          <td>
            <div className="product-info">
              <img
                src={product.image ? `http://localhost:5000/uploads/${product.image}` : ""}
                alt="product"
              />

              <span>{product.name}</span>
            </div>


          </td>


          <td>₹{product.price}</td>
          <td>{product.stock}</td>


          <td>
            <button className="delete-btn"  onClick={() => handleDelete(product._id)}>
              Delete
            </button>



            <button className="edit-btn"  onClick={()=>  handleEdit(product)}>
              Edit
            </button>


          </td>
        </tr>


      ))}
    </tbody>
  </table>
  )}

 </div>



{showEditForm && (

  <div className="edit-form-container">


  <div className="edit-form-card">
  <h3>Edit Product</h3>

  <form onSubmit={handleUpdate}>


  <input type="text" value={editName}
     onChange={(e) => setEditName(e.target.value)}
     
    placeholder="Product Name"
   />

  <input type="number" value={editPrice} onChange={(e) =>setEditPrice(e.target.value)}   placeholder="Price" />

  <input
  type="number"
  value={editStock}

  onChange={(e) => setEditStock(e.target.value)}
  placeholder="Stock"
  />


  <input type="text" value={editDescription}
  
  onChange={(e) => setEditDescription(e.target.value)}  placeholder="Description"
  />

  <input type="file" onChange={(e)=>setEditImage(e.target.files[0])} />



  <div className="edit-buttons">

    <button type="submit" className="update-btn">
    Update
    </button>



    <button type="button"
      className="cancel-btn"
                  
      onClick={() => setShowEditForm(false)}
    >
     Cancel
    </button>

  </div>

  </form>

   </div>

  </div>

 )}

  </div>
  );
}

export default ViewProduct;