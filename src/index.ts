import React, { createElement } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

createRoot(root).render(createElement(App));
