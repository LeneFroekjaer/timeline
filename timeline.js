"use strict";
window.addEventListener("DOMContentLoaded", init);

// Global array: containing the json-data.
let allTimepoints = [];

function init() {
  loadJSON(); // go to GETTING JSON
  loadSVG(); // go to GETTING SVG
}

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
      // displaying the svg
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", svgdata);

      getTimepoints(); // Go to INTERACTING WITH SVG
    });
}

//// ---- INTERACTING WITH SVG

function getTimepoints() {
  const events = document.querySelectorAll(".event");
  events.forEach(interactivTimepoint);
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

    // making sure that there is only one timepoint-data displaying.
    document.querySelector("article").innerHTML = "";

    clickEvent(event); // go to CLICK AN EVENT
  });
}
//// ---- CLICK AN EVENT

function clickEvent(event) {
  event.querySelector(".nail").classList.add("choosen");
  event.querySelector(".year").classList.add("choosen");

  allTimepoints.forEach(timepoint => {
    //only the timepoint with the same event.id (the event that has been clicked).
    if (timepoint.id === event.id) {
      showInfo(timepoint);
    }
  });
}

//// ---- SHOW INFO-BOX

function showInfo(timepoint) {
  // show info-boks
  document.querySelector("article").style.visibility = "visible";
  document.querySelector("article").style.opacity = "1";

  const clone = document
    .querySelector("#event_template")
    .content.cloneNode(true);

  clone.querySelector("[data-field='title']").textContent = timepoint.title;
  clone.querySelector("[data-field='year']").textContent = timepoint.year;
  clone.querySelector("[data-field='description']").textContent =
    timepoint.description;

  // links in info-box
  clone.querySelector("[data-field='link1']").textContent = timepoint.linkname1;
  clone.querySelector("[data-field='link1']").href = timepoint.link1;
  clone.querySelector("[data-field='link2']").textContent = timepoint.linkname2;
  clone.querySelector("[data-field='link2']").href = timepoint.link2;

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
