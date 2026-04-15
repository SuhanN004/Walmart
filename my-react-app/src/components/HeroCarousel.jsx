import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroCarousel.css";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

import item1 from "../assets/item1.jpg";
import item2 from "../assets/item2.jpg";
import item3 from "../assets/item3.jpg";
import item4 from "../assets/item4.jpg";
import item5 from "../assets/item5.jpg";
import item6 from "../assets/item6.jpg";

import l1 from "../assets/l1.png";
import l2 from "../assets/l2.png";
import l3 from "../assets/l3.png";
import l4 from "../assets/l4.png";
import l5 from "../assets/l5.png";

function HeroCarousel() {

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const slides = [
    { image: hero1 },
    { image: hero2 },
    { image: hero3 },
  ];

  const products = [
    { img: item1, price: "$199.99", title: "Treadmill" },
    { img: item2, price: "$19.79", title: "Hair Curling" },
    { img: item3, price: "$11.42", title: "Nose Strips" },
    { img: item4, price: "$24.29", title: "Kitchen Set" },
    { img: item5, price: "$49.99", title: "Hair Dryer" },
    { img: item6, price: "$133.51", title: "Mattress" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="hero-carousel">


      <div
        className="hero-slide"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      >
        <button className="left" onClick={prevSlide}>‹</button>
        <button className="right" onClick={nextSlide}>›</button>
      </div>

      {/* ===== FLASH DEALS ===== */}
      <div className="flash-section">

        <div className="flash-header">
          <h2>Flash Deals</h2>
          <span className="view-all">View all</span>
        </div>

        <div className="flash-row">
          {products.map((p, i) => (
            <div className="flash-card" key={i}>
              <img src={p.img} alt="" />
              <p className="price">{p.price}</p>
              <p className="title">{p.title}</p>
              <button className="option-btn">Options</button>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-grid">

        {/* LEFT BIG */}
        <div className="hero-big-left" onClick={() => handleClick("/auto-service")}>
          <img src={l1} alt="" />
          <div className="hero-text">
            <h2>Book auto services easily online</h2>
            <button>Schedule now</button>
          </div>
        </div>

        {/* CENTER */}
        <div className="hero-center">

          {/* TOP WIDE */}
          <div className="hero-wide" onClick={() => handleClick("/cashback")}>
            <img src={l2} alt="" />
            <p>5% cashback</p>
          </div>

          {/* BOTTOM 2 */}
          <div className="hero-bottom">
            <div className="hero-small" onClick={() => handleClick("/gift-cards")}>
              <img src={l3} alt="" />
              <p>Spring gift cards</p>
            </div>

            <div className="hero-small" onClick={() => handleClick("/wishlist")}>
              <img src={l4} alt="" />
              <p>Wishlist</p>
            </div>
          </div>

        </div>

        {/* RIGHT BIG */}
        <div className="hero-big-right" onClick={() => handleClick("/greenhouse")}>
          <img src={l6} alt="" />
          <div className="hero-text-right">
            <h3>Greenhouses? We’ve got ’em!</h3>
            <span>Shop now</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default HeroCarousel;