"use strict";
window.addEventListener("DOMContentLoaded", loadSVG); // go to GETTING SVG
window.addEventListener("DOMContentLoaded", loadJSON); // go to GETTING JSON

// objects for json-data
let Events = {
  id: "-event-id-",
  title: "-event-title-",
  year: "-event-year-",
  description: "-event-description-",
  link1: "-event-link1-",
  link2: "-event-link2-",
  linkname1: "-name-of-link1-",
  linkname2: "-name-of-link2-",
  fromJSON(jsonObject) {
    this.id = jsonObject.id;
    this.title = jsonObject.title;
    this.year = jsonObject.year;
    this.description = jsonObject.description;
    this.link1 = jsonObject.link1;
    this.link2 = jsonObject.link2;
    this.linkname1 = jsonObject.linkname1;
    this.linkname2 = jsonObject.linkname2;
  }
};
let allEvents = []; // Global: containing the json-data.

//// ---- GETTING JSON
function loadJSON() {
  fetch("data.json").then(response =>
    response.json().then(jsondata => {
      prepareObjects(jsondata);
    })
  );
}

// preparing objects.
function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    //Making an new object.
    let hcaevent = Object.create(Events);
    hcaevent.fromJSON(jsonObject);

    // saving the data in a global array.
    allEvents.push(hcaevent);
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

      chooseEvent(); // Go to INTERACTING WITH SVG
    });
}

//// ---- INTERACTING WITH SVG

function chooseEvent() {
  const events = document.querySelectorAll(".event");
  events.forEach(interactivEvent);
}

function interactivEvent(event) {
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
  //event.querySelector("text").style.fill = "red";
  allEvents.forEach(object => {
    //only the object with the same event.id (the event that has been clicked).
    if (object.id === event.id) {
      placeInfo(object);
    }
  });
}

function placeInfo(object) {
  // removes footer and title.
  document.querySelector("footer").style.display = "none";
  document.querySelector("h1").style.display = "none";
  // showing the infoboks.
  document.querySelector("article").style.display = "block";
  // adjust the svg.
  document.querySelector("svg").style.height = "60vh";

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

  document.querySelector("h1").style.display = "block";
  document.querySelector("article").style.display = "none";
  document.querySelector("footer").style.display = "block";
  document.querySelector("svg").style.height = "500px";
}
