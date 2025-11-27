// src/hooks/useHighestZindex.js
import { useState, useEffect } from 'react';

/**
 * A hook to find the highest z-index on the page and provide a value
 * that is higher, ensuring an element is always on top.
 * @param {any} trigger - A value that, when changed, triggers a re-calculation.
 * @returns {number} A z-index value guaranteed to be the highest.
 */
export function useHighestZindex(trigger) {
  const [highestZ, setHighestZ] = useState(0);

  useEffect(() => {
    if (trigger) {
      const allZIndexes = Array.from(document.querySelectorAll('body *'))
        .map(el => parseFloat(window.getComputedStyle(el).zIndex))
        .filter(z => !isNaN(z));

      const maxZ = Math.max(0, ...allZIndexes);
      setHighestZ(maxZ + 1);
    }
  }, [trigger]); // Re-run when the trigger value changes

  return highestZ;
}