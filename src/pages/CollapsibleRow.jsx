import React, { useState } from "react";

export default function CollapsibleRow({ title, children, value1, value2, diff, initiallyExpanded = false }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <>
      <tr style={{ backgroundColor: "#f0f0f0", cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <td>
          {expanded ? "▼" : "▶"} <strong>{title}</strong>
        </td>
        <td>{value1 !== undefined ? value1 : ""}</td>
        <td>{value2 !== undefined ? value2 : ""}</td>
        <td>{diff !== undefined ? diff : ""}</td>
      </tr>
      {expanded && children}
    </>
  );
}
