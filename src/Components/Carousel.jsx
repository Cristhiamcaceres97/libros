import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const images = [
    {
      img: "https://www.mujeresqueleen.com/wp-content/uploads/2019/11/Orgullo-Resena-1200x675.png",
    },    

    {
      img: "https://4.bp.blogspot.com/-aw2R0Yr5QZk/VK1bjWZmj2I/AAAAAAAAFRs/Ru8vHSQMwME/s1600/Poster%2BThe%2BFlash.jpg",
    },
    
    {
      img: "https://hips.hearstapps.com/hmg-prod/images/mejores-libros-1608147322.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div key={index}>
          <div
            className={`carousel-item ${
              index === currentImageIndex ? "active" : ""
            }`}
          >
            <img src={image.img} alt={`carousel ${index + 1}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
