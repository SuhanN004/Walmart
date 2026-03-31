import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/ProductPage.css";
import WalmartHeader from "./WalmartHeader";
import { CartContext } from "../context/CartContext";

function ProductPage() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart, cartItems, removeFromCart } = useContext(CartContext);

  
  const userId = localStorage.getItem("userId");

  
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/${id}`);
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

      await axios.post("http://localhost:5000/api/order/create", {
        userId: userId,   
        items: [
          { ...product, qty: 1 }
        ],
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

        
        <div className="product-left">
          <div className="main-image-box">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt="product"
            />
          </div>
        </div>

       
        <div className="product-right">

          <p className="brand">Visit Store</p>

          <h2 className="product-title">{product.name}</h2>

          <p className="price">₹{product.price}</p>

          <p className="desc">{product.description}</p>

          
          <div className="cart-toggle">

            {getItemQty() === 0 ? (

              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>

            ) : (

              <div className="qty-box">

                <button
                  className="qty-btn"
                  onClick={() => removeFromCart(product._id)}
                >
                  −
                </button>

                <span className="qty-text">
                  {getItemQty()} added
                </span>

                <button
                  className="qty-btn"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>

              </div>

            )}

          </div>

          
          <button
            className="buy-btn"
            onClick={handleBuy}
          >
            Buy Now
          </button>

          

        </div>

      </div>
    </>
  );
}

export default ProductPage;