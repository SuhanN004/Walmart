import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/Productpage.css";
import WalmartHeader from "./WalmartHeader";
import { CartContext } from "../context/CartContext";

function ProductPage() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const BASE_URL = "https://walmart-3-ysdt.onrender.com";

  const { addToCart, cartItems, removeFromCart } = useContext(CartContext);

  const userId = localStorage.getItem("userId");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const getItemQty = () => {
    if (!product) return 0;
    const item = cartItems.find(i => i._id === product._id);
    return item ? item.qty : 0;
  };

  const handleBuy = async () => {
    try {
      await axios.post(`${BASE_URL}/api/order/create`, {
        userId: userId,
        items: [{ ...product, qty: 1 }],
        totalAmount: product.price
      });

      alert("Product purchased successfully");
    } catch (err) {
      console.log(err);
      alert("Error purchasing product");
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <WalmartHeader />

      <div className="product-page">

        {/* LEFT - IMAGE */}
        <div className="product-left">
          <div className="main-image-box">
            <img
              src={`${BASE_URL}/uploads/${product.image}`}
              alt="product"
            />
          </div>
        </div>

        {/* CENTER - DETAILS */}
        <div className="product-center">

          <p className="brand">Visit Store</p>

          <h2 className="product-title">{product.name}</h2>

          {/* DESCRIPTION */}
          <div className="desc-box">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          {/* FEATURES */}
          {product.features && product.features.length > 0 && (
            <div className="features-box">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT - BUY BOX */}
        <div className="product-right">

          <div className="price-box">
            <h2 className="price">₹{product.price}</h2>
          </div>

          <div className="cart-section">

            {getItemQty() === 0 ? (
              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            ) : (
              <div className="qty-box">
                <button onClick={() => removeFromCart(product._id)}>−</button>
                <span>{getItemQty()}</span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            )}

            <button
              className="buy-btn"
              onClick={handleBuy}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductPage;