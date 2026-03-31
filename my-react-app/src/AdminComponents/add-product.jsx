import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AdminStyles/AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {

  const navigate = useNavigate();

  const[name,setName] = useState("");
  const[price,setPrice] = useState("");
  const[stock,setStock] = useState("");


  const [image,setImage] = useState(null);
  const[description, setDescription] = useState("");
  const [category,setCategory] = useState("");

  
  const [services, setServices] = useState([]);

  

  useEffect(() => {

    const fetchServices = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/service/view"
        );

        setServices(res.data);

      } catch (error) {

        console.log("Error fetching services:", error);

      }

    };

    fetchServices();

  }, []);



  const handleAdd = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("category", category);

      await axios.post(
        "http://localhost:5000/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );



      toast.success("Product added successfully", {
        position: "top-right",
        autoClose: 3000,
      });



      setTimeout(() => {
        navigate("/admin/view-product");
      }, 1500);



    } catch (err) {

      console.error("FULL ERROR:", err.response?.data || err.message);

      toast.error("Error adding product", {
        position: "top-right",
        autoClose: 3000,
      });

    }
  };



  return (
    <div className="add-product-container">

      <div className="add-product-card">

        <h2>Add Product</h2>

        <form onSubmit={handleAdd}>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />


          <div className="category-select">
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Select Category</option>
          { services.map((service)=>(
            <option key={service._id} value={service.title}>
            {service.title}
            </option>
          ))}
          </select>

          
            
          </div>



          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />




          <button type="submit">
          Add Product
          </button>

        </form>

        <ToastContainer />

      </div>

    </div>
  );
}

export default AddProduct;