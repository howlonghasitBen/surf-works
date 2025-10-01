import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";
import { CARD_DATA } from "../data/cardData";

const CardCarousel = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    // Debug: Log card data
    console.log("=== CARD CAROUSEL DEBUG ===");
    console.log("CARD_DATA imported:", CARD_DATA);
    console.log("Number of cards:", CARD_DATA.length);

    CARD_DATA.forEach((card, i) => {
      console.log(`Card ${i}:`, {
        id: card.id,
        name: card.name,
        theme: card.theme,
        hasImage: !!card.image,
        imagePath: card.image,
      });
    });
    console.log("==========================");
  }, []);

  useEffect(() => {
    const wrapper = carouselRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 1080;
    const scrollSpeed = isMobile ? 0.8 : 1;
    let animationId;

    const autoScroll = () => {
      if (!isPaused) {
        if (isMobile) {
          scrollPosRef.current += scrollSpeed;
          wrapper.scrollLeft = scrollPosRef.current;

          if (scrollPosRef.current >= wrapper.scrollWidth / 2) {
            scrollPosRef.current = 0;
            wrapper.scrollLeft = 0;
          }
        } else {
          scrollPosRef.current += scrollSpeed;
          wrapper.scrollTop = scrollPosRef.current;

          if (scrollPosRef.current >= wrapper.scrollHeight / 2) {
            scrollPosRef.current = 0;
            wrapper.scrollTop = 0;
          }
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    const timeoutId = setTimeout(() => {
      scrollPosRef.current = isMobile ? wrapper.scrollLeft : wrapper.scrollTop;
      animationId = requestAnimationFrame(autoScroll);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  // Duplicate cards for seamless loop
  const displayCards = [...CARD_DATA, ...CARD_DATA];

  console.log("Rendering cards, count:", displayCards.length);

  return (
    <div
      className="rightContentWrapper"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-content">
        {displayCards.map((card, index) => {
          console.log(
            `Rendering card ${index}:`,
            card.name,
            "theme:",
            card.theme
          );
          return <Card key={`${card.id}-${index}`} card={card} />;
        })}
      </div>
    </div>
  );
};

export default CardCarousel;
