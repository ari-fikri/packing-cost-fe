import React, { useState } from "react";

export default function CollapsibleRow({ title, children, initiallyExpanded = false }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <>
      <tr style={{ backgroundColor: "#f0f0f0", cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <td colSpan={4}>
          {expanded ? "▼" : "▶"} <strong>{title}</strong>
        </td>
      </tr>
      {expanded && children}
    </>
  );
}
