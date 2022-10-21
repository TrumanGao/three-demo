import "./style/index.less";
import ape from "./assets/ape.svg";

function component() {
  const element = document.createElement("div");
  element.setAttribute("id", "app");
  element.style.backgroundImage = `url(${ape})`;

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "Hello World";

  return element;
}

document.body.appendChild(component());
