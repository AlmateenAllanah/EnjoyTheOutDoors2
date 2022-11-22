"use strict";
// import location Data from locationdata.js
import { locationsArray } from "./locationData.js";
import { nationalParksArray } from "./nationalParkData.js";
import { parkTypesArray } from "./parkTypeData.js";

const locationSearchSelect = document.querySelector("#locationSearchSelect");
const typeSearchSelect = document.querySelector("#typeSearchSelect");

// TOGGLE SEARCH TYPE
const locationSearchContainer = document.querySelector(
  "#locationSearchContainer"
);
const typeSearchContainer = document.querySelector("#typeSearchContainer");
const searchOptions = document.querySelector("#search-options");
searchOptions.addEventListener("change", () => {
  clearSearchResults();
  if (searchOptions.value == "search by location") {
    if (typeSearchContainer) {
      typeSearchContainer.style.display = "none";
    }
    locationSearchContainer.style.display = "flex";
  } else if (searchOptions.value == "search by type") {
    if (locationSearchContainer) {
      locationSearchContainer.style.display = "none";
    }
    typeSearchContainer.style.display = "flex";
  }
});

window.onload = init;

function init() {
  //   selectLocationShow();
  //   selectParktypeHide();
  populateLocationOptions();
  populateParktypeOptions();
}

//load up options from data file.
function populateLocationOptions() {
  let locationOptions = locationsArray
    .map((loc) => {
      return `<option value = ${loc}>${loc}</option>`;
    })
    .join("");
  locationSearchSelect.innerHTML =
    ' <option value="">Select Loaction</option>' + locationOptions;
}

locationSearchSelect.addEventListener("change", (e) => {
  const resultsRow = document.getElementById("resultsRow");
  resultsRow.innerHTML = "";
  var e = document.getElementById("ddlViewBy");
  var text =
    locationSearchSelect.options[locationSearchSelect.selectedIndex].text;
  let result = filterParksByLocation(nationalParksArray, text);
  if (result.length == 0) {
    resultsRow.innerHTML = "<h1>No Search Result</h1>";
  } else {
    addParksToResults(result);
  }
});

typeSearchSelect.addEventListener("change", () => {
  const resultsRow = document.getElementById("resultsRow");
  resultsRow.innerHTML = "";
  let result = filterParksByParkType(
    nationalParksArray,
    typeSearchSelect.value
  );
  if (result.length == 0) {
    resultsRow.innerHTML = "<h1>No Search Result</h1>";
  } else {
    addParksToResults(result);
  }
  console.log(result);
});

//load up options from data file.
function populateParktypeOptions() {
  let typeOptions = parkTypesArray
    .map((typ) => {
      return `<option value = ${typ}>${typ}</option>`;
    })
    .join("");
  typeSearchSelect.innerHTML =
    ' <option value="">Select ParkType</option>' + typeOptions;
}

//figure out which is the selected optoin, and hide/show the appropriate areas...
// function OnSearchTypeChanged() {
//   let current = getCurrentlySelectedSearchType();
//   if (current == "location") {
//     selectLocationShow();
//     selectParktypeHide();
//   } else if ((current = "parktype")) {
//     selectLocationHide();
//     selectParktypeShow();
//   }
// }

function filterParksByParkType(inputParks, parkType) {
  let results = [];
  results = inputParks.filter((park) =>
    park.LocationName.toLowerCase().includes(parkType.toLowerCase())
  );
  return results;
}

function filterParksByLocation(inputParks, location) {
  let results = [];
  results = inputParks.filter(
    (park) => park.State.toLowerCase() == location.toLowerCase()
  );
  return results;
}

//returns "location" or "parktype" depending on current selection
// function getCurrentlySelectedSearchType() {}

// function selectLocationHide() {}

// function selectLocationShow() {}

// function selectParktypeHide() {}

// function selectParktypeShow() {}

function clearSearchResults() {
  const resultsRow = document.getElementById("resultsRow");
  resultsRow.innerHTML = "";
  locationSearchSelect.value = "";
  typeSearchSelect.value = "";
}

//Add an array of parks to the results div...
function addParksToResults(parks) {
  for (let park of parks) {
    addParkToResults(park);
  }
}

//Adds a single park to the results div.
function addParkToResults(park) {
  const resultsRow = document.getElementById("resultsRow");
  //create the html to represetn a single park, and add it to the
  // serach reasults div with "resultsRow" id
  let outerCardDiv = document.createElement("div");
  outerCardDiv.className = "outerCardDiv";
  let topDiv = document.createElement("div");
  topDiv.className = "card-heading";

  let bottomDiv = document.createElement("div");
  bottomDiv.className = "card-footer";

  let heading = document.createElement("h6");
  heading.textContent = `${park.LocationName}`;

  let address = document.createElement("p");
  address.className = "address";
  address.textContent = `${park.Address}, ${park.State}`;

  if (park.Visit) {
    let visit = document.createElement("a");
    visit.className = "visit";
    visit.textContent = `${park.Visit}`;
    visit.setAttribute("href", `${park.Visit}`);
    visit.setAttribute("target", "_blank");
    bottomDiv.append(visit);
  }

  outerCardDiv.append(topDiv);
  outerCardDiv.append(bottomDiv);
  topDiv.append(heading);
  topDiv.append(address);

  //do all of my styling / content here....

  resultsRow.appendChild(outerCardDiv);
  //   resultsRow.innerHTML =outerCardDiv
}
