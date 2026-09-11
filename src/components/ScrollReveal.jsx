import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Ultra smooth, visible scroll-triggered entrance animation.
 * Features:
 * - Directional slides: 'up', 'down', 'left', 'right', 'zoom', 'fade'
 * - Staggered children support
 * - Dynamic threshold & viewport trigger
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 800,
  distance = '40px',
  threshold = 0.12,
  once = false, // Set to false so user can see it every time they scroll into section
  as: Component = 'div',
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -60px 0px', // Triggers right as user scrolls into the element
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once]);

  // Initial hidden transform styles
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}, 0)`;
      case 'down':
        return `translate3d(0, -${distance}, 0)`;
      case 'left':
        return `translate3d(${distance}, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}, 0, 0)`;
      case 'zoom':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component
      ref={domRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)', // Smooth dynamic spring easing
        willChange: 'opacity, transform',
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
