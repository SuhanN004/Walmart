import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  
  const userId = localStorage.getItem("userId");

  const cartKey = `cart_${userId}`; 

  
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem(cartKey);
    return stored ? JSON.parse(stored) : [];
  });

  
  useEffect(() => {
    if (userId) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  
  const addToCart = (product) => {

    const existing = cartItems.find(item => item._id === product._id);

    if (existing) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  
  const removeFromCart = (id) => {
    const existing = cartItems.find(item => item._id === id);

    if (existing.qty === 1) {
      setCartItems(cartItems.filter(item => item._id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item._id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      ));
    }
  };

  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};