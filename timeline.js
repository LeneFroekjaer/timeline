"use strict";
window.addEventListener("DOMContentLoaded", loadSVG);

//// HENTER SVG'EN

function loadSVG() {
  fetch("timeline.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", svgdata);
      chooseEvent();
    });
}
