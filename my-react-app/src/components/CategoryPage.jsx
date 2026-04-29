import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import WalmartHeader from "./WalmartHeader";
import "../styles/CategoryPage.css";

function CategoryPage() {

  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryImage, setCategoryImage] = useState("");

  const api = import.meta.env.VITE_API;

  const fetchData = async () => {
    try {

      const [productRes, serviceRes] = await Promise.all([
        axios.get(`${api}/api/product/view`),
        axios.get(`${api}/api/service/view`)
      ]);

      
      const filtered = productRes.data.filter((p) =>
        p.category?.trim().toLowerCase() ===
        decodedCategory.trim().toLowerCase()
      );

      setProducts(filtered);

      
      const service = serviceRes.data.find(
        (s) =>
          s.title.trim().toLowerCase() ===
          decodedCategory.trim().toLowerCase()
      );

      if (service?.image) {
        setCategoryImage(`${api}/uploads/${service.image}`);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <>
      <WalmartHeader />

      <div className="category-container">

        
        {categoryImage && (
          <div className="category-banner">
            <img src={categoryImage} alt="category" />

            <div className="banner-overlay">
              <h1 className="category-title">{decodedCategory}</h1>
              <p>{products.length} items available</p>
            </div>
          </div>
        )}

        
        {!categoryImage && (
          <div className="category-header">
            <h1>{decodedCategory}</h1>
            <p>{products.length} items</p>
          </div>
        )}

        
        {products.length === 0 ? (
          <div className="empty-box">
            <h2>No products found </h2>
          </div>
        ) : (
          <div className="product-grid">

            {products.map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >

                
                <div className="image-box">
                  <img
                    src={`${api}/uploads/${product.image}`}
                    alt="product"
                  />
                </div>

                
                <div className="product-info">

                  <p className="price">₹{product.price}</p>

                  <p className="title">
                    {product.name.length > 55
                      ? product.name.slice(0, 55) + "..."
                      : product.name}
                  </p>

                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                  >
                    View Details
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default CategoryPage;