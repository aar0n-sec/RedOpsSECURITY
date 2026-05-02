import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursor || !cursorRing) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';

      const serviceCard = e.target.closest('.service-card');
      if (serviceCard) {
        const rect = serviceCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx2 = ((y - cy) / cy) * 6;
        const ry2 = ((x - cx) / cx) * -6;
        serviceCard.style.transform = `translateY(-8px) scale(1.01) perspective(800px) rotateX(${rx2}deg) rotateY(${ry2}deg)`;
      }
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateCursor();

    const interactiveSelector = 'a, button, [data-page], .service-card, .problem-card, .philosophy-card, .why-item, .resource-card, .case-study-item';

    const onMouseOver = (e) => {
      const target = e.target;
      if (target.closest(interactiveSelector)) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorRing.style.width = '54px';
        cursorRing.style.height = '54px';
        cursorRing.style.opacity = '0.8';
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (target.closest(interactiveSelector)) {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.opacity = '0.5';
      }

      const serviceCard = target.closest('.service-card');
      if (serviceCard && !serviceCard.contains(e.relatedTarget)) {
        serviceCard.style.transform = '';
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>
    </>
  );
};

export default CustomCursor;
