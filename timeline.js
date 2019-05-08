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

      chooseEvent(); // Go to INTERACTING WITH SVG
    });
}

//// INTERACTING WITH SVG

function chooseEvent() {
  const events = document.querySelectorAll(".event");
  events.forEach(interactivEvent);
}

function interactivEvent(event) {
  event.addEventListener("mouseover", () => {
    hoverEvent(event); // GO TO "HOVER OVER SVG"
  });
}

//// HOVER OVER AN EVENT

function hoverEvent(event) {
  event.querySelector(".nail").style.fill = "#E87D4D";
  event.querySelector("text").style.fill = "#E87D4D";
  event.addEventListener("mouseout", () => {
    nohoverEvent(event);
  });
}

function nohoverEvent(event) {
  event.querySelector(".nail").style.fill = "#494949";
  event.querySelector("text").style.fill = "#494949";
}
