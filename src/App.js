import React, { useEffect, useState } from "react";
import "./style/index.less";
import ape from "./assets/ape.svg";
import { Three } from "./components/three/three.jsx";

export const App = () => {
  const [date, setDate] = useState(new Date().toString());
  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toString());
    }, 1000);
  });

  return (
    <div className="app" style={{ backgroundImage: `url(${ape})` }}>
      <div className="main">
        <div className="main-date">{date}</div>
        <Three></Three>
      </div>
    </div>
  );
};
