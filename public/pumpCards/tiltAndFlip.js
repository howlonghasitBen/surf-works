document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const imageArea = document.getElementById("imageArea");
  const flavorText = document.getElementById("flavorText");

  let isFlipped = false;
  let isInteracting = false;
  let currentRotationX = 0;
  let currentRotationY = 0;

  function calculateTilt(x, y, rect) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateY = (deltaX / rect.width) * 45;
    const rotateX = -(deltaY / rect.height) * 45;

    return { rotateX, rotateY };
  }

  function applyTilt(rotateX, rotateY, immediate = false) {
    if (isAnimating) return; // Don't apply tilt during flip animation

    currentRotationX = rotateX;
    currentRotationY = rotateY;

    let baseRotationY = isFlipped ? 180 : 0;
    const tiltTransform = `rotateX(${rotateX}deg) rotateY(${
      baseRotationY + rotateY
    }deg)`;

    const imageDepth = Math.max(Math.abs(rotateX), Math.abs(rotateY)) * 1.5;
    const flavorDepth = imageDepth * 0.4;

    const imageTransform = `translateZ(${imageDepth}px) rotateX(${
      rotateX * 0.5
    }deg) rotateY(${rotateY * 0.5}deg)`;
    const flavorTransform = `translateZ(${flavorDepth}px) rotateX(${
      rotateX * 0.2
    }deg)`;

    if (immediate) {
      card.style.transition = "none";
      imageArea.style.transition = "none";
      flavorText.style.transition = "none";
    } else {
      card.style.transition = "transform 0.1s ease-out";
      imageArea.style.transition = "transform 0.1s ease-out";
      flavorText.style.transition = "transform 0.1s ease-out";
    }

    card.style.transform = tiltTransform;
    imageArea.style.transform = imageTransform;
    flavorText.style.transform = flavorTransform;
  }

  function resetTilt() {
    if (isAnimating) return; // Don't reset during flip animation

    card.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    imageArea.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    flavorText.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    let baseRotationY = isFlipped ? 180 : 0;
    card.style.transform = `rotateY(${baseRotationY}deg)`;

    imageArea.style.transform = "translateZ(0)";
    flavorText.style.transform = "translateZ(0)";

    currentRotationX = 0;
    currentRotationY = 0;
  }

  // Mouse events
  card.addEventListener("mouseenter", () => {
    if (!isAnimating) {
      isInteracting = true;
    }
  });

  card.addEventListener("mousemove", (e) => {
    if (!isInteracting || isAnimating) return;

    const rect = card.getBoundingClientRect();
    const { rotateX, rotateY } = calculateTilt(e.clientX, e.clientY, rect);
    applyTilt(rotateX, rotateY, true);
  });

  card.addEventListener("mouseleave", () => {
    isInteracting = false;
    if (!isAnimating) {
      resetTilt();
    }
  });

  // Click handling
  let clickStartTime = 0;
  let clickStartPos = { x: 0, y: 0 };
  let hasMovedSignificantly = false;
  let isAnimating = false;

  card.addEventListener("mousedown", (e) => {
    if (isAnimating) return;

    clickStartTime = Date.now();
    clickStartPos = { x: e.clientX, y: e.clientY };
    hasMovedSignificantly = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (clickStartTime > 0 && !isInteracting) {
      const deltaX = Math.abs(e.clientX - clickStartPos.x);
      const deltaY = Math.abs(e.clientY - clickStartPos.y);

      if (deltaX > 10 || deltaY > 10) {
        hasMovedSignificantly = true;
      }
    }
  });

  card.addEventListener("mouseup", () => {
    if (isAnimating || clickStartTime === 0) return;

    const clickDuration = Date.now() - clickStartTime;

    if (clickDuration < 300 && !hasMovedSignificantly) {
      flipCard();
    }

    clickStartTime = 0;
    hasMovedSignificantly = false;
  });

  // Touch events
  let touchStartTime = 0;
  let touchStartPos = { x: 0, y: 0 };
  let touchCurrentPos = { x: 0, y: 0 };
  let touchHasMoved = false;
  let isTracking = false;

  card.addEventListener("touchstart", (e) => {
    if (isAnimating) return;

    e.preventDefault();
    touchStartTime = Date.now();
    const touch = e.touches[0];
    touchStartPos = { x: touch.clientX, y: touch.clientY };
    touchCurrentPos = { x: touch.clientX, y: touch.clientY };
    touchHasMoved = false;
    isTracking = true;
    isInteracting = true;

    const rect = card.getBoundingClientRect();
    const { rotateX, rotateY } = calculateTilt(
      touch.clientX,
      touch.clientY,
      rect
    );
    applyTilt(rotateX, rotateY, true);
  });

  card.addEventListener("touchmove", (e) => {
    if (isAnimating) return;

    e.preventDefault();

    if (!isTracking) return;

    const touch = e.touches[0];
    touchCurrentPos = { x: touch.clientX, y: touch.clientY };

    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);

    const rect = card.getBoundingClientRect();
    const { rotateX, rotateY } = calculateTilt(
      touch.clientX,
      touch.clientY,
      rect
    );
    applyTilt(rotateX, rotateY, true);

    if (deltaX > 15 || deltaY > 15) {
      touchHasMoved = true;
    }
  });

  card.addEventListener("touchend", (e) => {
    if (isAnimating) return;

    e.preventDefault();

    const touchDuration = Date.now() - touchStartTime;
    const deltaX = touchCurrentPos.x - touchStartPos.x;

    isTracking = false;
    isInteracting = false;

    const isHorizontalSwipe = Math.abs(deltaX) > 80;

    if (isHorizontalSwipe && touchDuration < 600) {
      flipCard();
    } else if (!touchHasMoved && touchDuration < 300) {
      flipCard();
    }

    if (!isAnimating) {
      setTimeout(() => {
        if (!isInteracting) {
          resetTilt();
        }
      }, 150);
    }

    touchStartTime = 0;
    touchHasMoved = false;
  });

  function flipCard() {
    if (isAnimating) return;

    isAnimating = true;
    isFlipped = !isFlipped;

    card.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    imageArea.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    flavorText.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    imageArea.style.transform = "translateZ(0)";
    flavorText.style.transform = "translateZ(0)";

    requestAnimationFrame(() => {
      let baseRotationY = isFlipped ? 180 : 0;
      card.style.transform = `rotateY(${baseRotationY}deg)`;

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    });
  }

  card.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  window.addEventListener("blur", () => {
    isInteracting = false;
    isTracking = false;
    if (!isAnimating) {
      resetTilt();
    }
  });
});
