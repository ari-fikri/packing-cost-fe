// src/hooks/useHighestZindex.js
import { useState, useEffect } from 'react';

/**
 * A hook to find the highest z-index on the page and provide a value
 * that is higher, ensuring an element is always on top.
 * @returns {number} A z-index value guaranteed to be the highest.
 */
export function useHighestZindex() {
  const [highestZ, setHighestZ] = useState(0);

  useEffect(() => {
    const allZIndexes = Array.from(document.querySelectorAll('body *'))
      .map(el => parseFloat(window.getComputedStyle(el).zIndex))
      .filter(z => !isNaN(z));

    const maxZ = Math.max(0, ...allZIndexes);
    setHighestZ(maxZ + 1);
  }, []); // Runs once when the component mounts

  return highestZ;
}
