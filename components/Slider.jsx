"use client"; // Use this directive since we'll use client-side features like useState

import { useState } from "react";
import { Button } from "./ui/Button";
import styles from "./Slider.module.css"; // We'll use CSS Modules for styling
import Image from "next/image";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Sample images (replace with your own)
  const slides = [
    "/screenshots/app1.png",
    "/screenshots/app2.png",
    "/screenshots/app3.png",
    "/screenshots/page1.png",
    "/screenshots/page2.png",
    "/screenshots/page3.png",
    "/screenshots/page4.png",
  ];

  const changeSlide = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    setSlideIndex(newIndex);
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <div key={index} className={styles.slide}>
            <Image src={src} alt={`Slide ${index + 1}`} fill />
          </div>
        ))}
      </div>
      <Button className={styles.prev} onClick={() => changeSlide(-1)}>
        ❮
      </Button>
      <Button className={styles.next} onClick={() => changeSlide(1)}>
        ❯
      </Button>
    </div>
  );
};

export default Slider;
