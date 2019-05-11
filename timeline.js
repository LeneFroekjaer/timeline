"use strict";
window.addEventListener("DOMContentLoaded", loadSVG); // go to GETTING SVG
window.addEventListener("DOMContentLoaded", loadJSON); // go to GETTING JSON

// Global array: containing the json-data.
let allTimepoints = [];

//// ---- GETTING JSON
function loadJSON() {
  fetch("data.json").then(response =>
    response.json().then(jsondata => {
      sendToGlobalArray(jsondata);
    })
  );
}
// preparing objects
function sendToGlobalArray(jsonData) {
  jsonData.forEach(jsonObject => {
    // saving the data in a global array.
    allTimepoints.push(jsonObject);
  });
}

//// ---- GETTING SVG

function loadSVG() {
  fetch("timeline.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", svgdata);

      getTimepoints(); // Go to INTERACTING WITH SVG
    });
}

//// ---- INTERACTING WITH SVG

function getTimepoints() {
  const timepoints = document.querySelectorAll(".event");
  timepoints.forEach(interactivTimepoint);
}

function interactivTimepoint(event) {
  event.addEventListener("click", () => {
    // removes the colors from the before selected event.
    document.querySelectorAll(".nail").forEach(e => {
      e.classList.remove("choosen");
    });
    document.querySelectorAll(".year").forEach(e => {
      e.classList.remove("choosen");
    });

    // making sure that there is only one data-object displaying.
    document.querySelector("article").innerHTML = "";

    clickEvent(event); // go to CLICK AN EVENT
  });
}
//// ---- CLICK AN EVENT

function clickEvent(event) {
  event.querySelector(".nail").classList.add("choosen");
  event.querySelector(".year").classList.add("choosen");

  allTimepoints.forEach(object => {
    //only the object with the same event.id (the event that has been clicked).
    if (object.id === event.id) {
      placeInfo(object);
    }
  });
}

function placeInfo(object) {
  // show info-boks
  document.querySelector("article").style.visibility = "visible";
  document.querySelector("article").style.opacity = "1";

  const clone = document
    .querySelector("#event_template")
    .content.cloneNode(true);

  clone.querySelector("[data-field='title']").textContent = object.title;
  clone.querySelector("[data-field='year']").textContent = object.year;
  clone.querySelector("[data-field='description']").textContent =
    object.description;

  // preparing the links in infoboks
  clone.querySelector("[data-field='link1']").textContent = object.linkname1;
  clone.querySelector("[data-field='link1']").href = object.link1;
  clone.querySelector("[data-field='link2']").textContent = object.linkname2;
  clone.querySelector("[data-field='link2']").href = object.link2;

  const dest = document.querySelector("article");

  clone.querySelector("#closebutton").addEventListener("click", closeInfo);

  dest.appendChild(clone);
}

function closeInfo() {
  // removes the colors from the before selected event.
  document.querySelectorAll(".nail").forEach(e => {
    e.classList.remove("choosen");
  });
  document.querySelectorAll(".year").forEach(e => {
    e.classList.remove("choosen");
  });

  document.querySelector("article").style.visibility = "hidden";
  document.querySelector("article").style.opacity = "0";
}
