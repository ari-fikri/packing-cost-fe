import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html from '../comparison-draft.html?raw';

const CostMovementDetailPage = () => {
  const { partNo } = useParams();
  const containerRef = useRef(null);

  // Remove the script tag from the HTML string, as React won't execute it.
  const sanitizedHtml = html.replace(/<script>[\s\S]*?<\/script>/, '');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Re-implement the collapse functionality from the original script.
    const headers = container.querySelectorAll('.section-header');
    const clickListeners = [];

    headers.forEach(header => {
      const listener = () => {
        const content = header.nextElementSibling;
        if (content) {
          const icon = header.querySelector('.collapse-icon');
          const isCollapsed = content.style.display === 'none';
          content.style.display = isCollapsed ? '' : 'none';
          if (icon) {
            icon.textContent = isCollapsed ? '▼ ' : '► ';
          }
        }
      };
      
      header.addEventListener('click', listener);
      clickListeners.push({ header, listener });
    });

    // Cleanup function to remove event listeners when the component unmounts.
    return () => {
      clickListeners.forEach(({ header, listener }) => {
        header.removeEventListener('click', listener);
      });
    };
  }, [partNo]); // Rerun if the partNo changes.

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default CostMovementDetailPage;