import { useState } from "react";
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

function HeroCarousel() {
  const slides = [
    { image: hero1 },
    { image: hero2 },
    { image: hero3 },
  ];

  const products = [
    {


      img: item1,
      price: "$199.99 +$99 shipping",
      title: "3.75HP Folding Treadmill, 300lb Capacity with Incline",
    },
    {
      img: item2,
      price: "Now $19.79 (was $89.99)",

      title: "SKIMI Hair Curling Iron Wand with LED Display",
    },
    {

      img: item3,
      price: "$11.42",
      title: "Blackhead Remover Nose Strips, Deep Cleansing",
    },
    {


      img: item4,
      price: "Now $24.29 (was $26.99)",
      title: "20-Piece Kitchen Linen & Dish Towels Cotton Set",
    },
    {
      img: item5,
      price: "Now $49.99 (was $199.99)",


      title: "NICEBAY Hair Dryer Brush with Multiple Attachments",
    },
    {
      img: item6,
      price: "$133.51",
      title: "Avenco Breezure Pocket Spring Hybrid Queen Mattress",
    },
  ];



  const [current, setCurrent] = useState(0);

 const nextSlide = () => {
  
  if (current === slides.length - 1) {
    setCurrent(0);
  } else {
    setCurrent(current + 1);
  }
};


const prevSlide = () => {


  if (current === 0) {
    setCurrent(slides.length - 1);

  } else {
    setCurrent(current - 1);

  }
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

    
      <div className="flash-section">


        <div className="flash-header">
          <div>
            <h2>Flash Deals</h2>


            
          </div>
          <span className="view-all">View all</span>
        </div>

        <div className="flash-row">


          {products.map((product, i) => (

            <div className="flash-card" key={i}>

              <img src={product.img} alt="product" />
              <p className="price">{product.price}</p>

              <p className="title">{product.title}</p>
              <button className="option-btn">Options</button>
            </div>
          )
          )}
        </div>
      </div>

    </div>
  );
}

export default HeroCarousel;
