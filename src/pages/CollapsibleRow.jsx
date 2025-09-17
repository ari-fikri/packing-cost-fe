// src/components/CollapsibleRow.jsx
import React, { useState } from "react";

export default function CollapsibleRow({ title, value1, value2, diff, children }) {
  const [isOpen, setIsOpen] = useState(true);

  // Split into "label" and "(unit)"
  const match = title.match(/^(.*?)\s*(\([^)]*\))?$/);
  const mainText = match ? match[1].trim() : title;
  const unitText = match && match[2] ? match[2] : "";

  // helper to detect numeric strings (accepts commas and currency like "Rp ")
  const isNumeric = (val) => {
    if (val === null || val === undefined || val === "") return false;
    if (typeof val === "number") return true;

    // Convert to string and remove common non-numeric characters:
    // - remove currency prefix like 'Rp' or any letters
    // - remove spaces
    // - remove thousands separators (commas)
    // keep digits, minus sign, decimal point and trailing percent sign
    let s = String(val).trim();

    // If percent like "12.3%", keep the '%' for final test
    const hasPercent = s.endsWith("%");
    if (hasPercent) s = s.slice(0, -1);

    // Remove currency symbols/letters and thousands separators
    s = s.replace(/[^0-9.\-]/g, ""); // removes commas, spaces, 'Rp', etc.

    if (s === "" || s === "-" || s === "." || s === "-.") return false;

    // final numeric test
    const re = /^-?\d+(\.\d+)?$/;
    return re.test(s);
  };

  // styling helper for numeric cells
  const cellAlign = (val) => ({ textAlign: isNumeric(val) ? "right" : "left", whiteSpace: "nowrap" });

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
        <td style={cellAlign(value1)}>{value1}</td>
        <td style={cellAlign(value2)}>{value2}</td>
        <td style={cellAlign(diff)}>{diff}</td>
      </tr>

      {isOpen && children}
    </>
  );
}
