import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import WalmartHeader from "./WalmartHeader";
import HeroCarousel from "./HeroCarousel";
import WalmartFooter from "./WalmartFooter";
const BASE_URL = "https://walmart-3-ysdt.onrender.com";
import "../styles/HomeProducts.css";

function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${ BASE_URL } / api / product / view`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>

      <WalmartHeader />
      <HeroCarousel />

      <div className="home-products-section">
        <h2 className="home-title">All you need for Holi</h2>

        <div className="home-products-row">

          {products.map((product) => (

            <div
              className="home-product-card"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >

              <img src={`${BASE_URL}/uploads/${product.image}`} alt="product" />

              

              <p className="price">
                <span className="now">Now ₹{product.price}</span>
                <span className="old">₹{product.price + 100}</span>
              </p>

              <p className="title">{product.name}</p>

              <button
                className="option-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Options
              </button>

            </div>

          ))}

        </div>
      </div>

      <WalmartFooter />

    </div>
  );
}

export default Home;