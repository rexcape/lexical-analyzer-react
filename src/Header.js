import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./css/Header.css";

export default function Header() {
  return (
    <div className="header">
      <i className="fas fa-anchor"></i>
      <h1>词法分析器</h1>
    </div>
  );
}
