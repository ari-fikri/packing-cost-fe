// src/components/CollapsibleRow.jsx
import React, { useState } from "react";

export default function CollapsibleRow({ title, value1, value2, diff, children }) {
  const [isOpen, setIsOpen] = useState(true);

  // Split into "label" and "(unit)"
  const match = title.match(/^(.*?)\s*(\([^)]*\))?$/);
  const mainText = match ? match[1].trim() : title;
  const unitText = match && match[2] ? match[2] : "";

  // helper to detect numeric strings (like "123.45")
  const isNumeric = (val) =>
    typeof val === "number" ||
    (/^-?\d+(\.\d+)?%?$/.test(val) && val !== "");

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
              <span>
                <strong>{mainText}</strong>
              </span>
            </div>

            {/* unit text aligned right */}
            {unitText && <span>{unitText}</span>}
          </div>
        </td>

        {/* numeric values right aligned */}
        <td style={{ textAlign: isNumeric(value1) ? "right" : "left" }}>
          {value1}
        </td>
        <td style={{ textAlign: isNumeric(value2) ? "right" : "left" }}>
          {value2}
        </td>
        <td style={{ textAlign: isNumeric(diff) ? "right" : "left" }}>
          {diff}
        </td>
      </tr>

      {isOpen && children}
    </>
  );
}
