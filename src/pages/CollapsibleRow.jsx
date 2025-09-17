// src/components/CollapsibleRow.jsx
import React, { useState } from "react";

export default function CollapsibleRow({ title, value1, value2, diff, children }) {
  const [isOpen, setIsOpen] = useState(true);

  // Split into "label" and "(unit)"
  const match = title.match(/^(.*?)\s*(\([^)]*\))?$/);
  const mainText = match ? match[1].trim() : title;
  const unitText = match && match[2] ? match[2] : "";

  return (
    <>
      <tr
        style={{ backgroundColor: "#f9f9f9", cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <td>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* caret + main label together */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 6 }}>{isOpen ? "▼" : "▶"}</span>
              <span><strong>{mainText}</strong></span>
            </div>

            {/* unit text aligned right */}
            {unitText && <span>{unitText}</span>}
          </div>
        </td>
        <td>{value1}</td>
        <td>{value2}</td>
        <td>{diff}</td>
      </tr>

      {isOpen && children}
    </>
  );
}
