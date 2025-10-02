import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";
import { CARD_DATA } from "../data/cardData";

const CardCarousel = ({ isPaused = false }) => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const scrollPosRef = useRef(0);
  const touchTimeoutRef = useRef(null);

  useEffect(() => {
    const wrapper = carouselRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 1080;
    const scrollSpeed = isMobile ? 0.8 : 1;
    let animationId;

    const autoScroll = () => {
      // Pause if navigation is open, card is hovered, or user is touching
      if (!isPaused && !isHovered && !isTouching) {
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
  }, [isPaused, isHovered, isTouching]);

  const handleTouchStart = () => {
    setIsTouching(true);
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    // Keep touch state active for a brief moment after touch ends
    // to prevent auto-scroll from immediately resuming
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouching(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  const displayCards = [...CARD_DATA, ...CARD_DATA];

  return (
    <div
      className="rightContentWrapper"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="carousel-content">
        {displayCards.map((card, index) => (
          <Card key={`${card.id}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
