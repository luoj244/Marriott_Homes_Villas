// Task 1
// Filter PLACES by type. If the type property of an object in PLACES matches the typePreference parameter.
function filterPlacesByType(typePreference) {
  // Step 1: Create a new filteredPlaces array and store it in a variable
  let filteredPlaces = [];
  // Step 2: Loop through PLACES
  for (let i = 0; i < PLACES.length; i++) {
    let place = PLACES[i];
    // Step 3: If a place object's type property matches the typePreference parameter, add it to filteredPlaces
    if (place.type === typePreference) {
      filteredPlaces.push(place);
    }
  }
  // Step 4: After the loop, return filteredPlaces
  return filteredPlaces;
}

// Task 2
function createCard(place, map) {
  // Step 1: Create a new div element and store it in a variable
  const cardDiv = document.createElement("Div");
  // Step 2: Add the col class to the new div element
  cardDiv.classList.add("col");
  // Step 3: Set the innerHTML of the div with a template string. It should resemble the structure shown in the readme. Interpolate the values for place.name, place.img, and place.location where needed. More info - https://wesbos.com/template-strings-html
  cardDiv.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${place.img}" class="card-img-top" alt="${place.name}">
      <div class="card-body">
        <h5 class="card-title">${place.name}</h5>
        <p class="card-text">${place.location}</p>
      </div>
    </div>
  `;
  // Step 4: Add a click event listener to scroll to the map and zoom into the selected area
  cardDiv.addEventListener("click", () => {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });

    flyTo(ol.proj.fromLonLat([place.long, place.lat]), () => {
      flying = false;
      showPopupForPlace(place); //Show picture after after it zooms into the area
    });
  });

  // Step 5: Return the element
  return cardDiv;
}

function showPopupForPlace(place) {
  const features = vectorSource.getFeatures();
  const matchingFeature = features.find(
    (feature) => feature.get("name") === place.name
  );

  if (matchingFeature) {
    const coordinates = matchingFeature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);

    let popover = bootstrap.Popover.getInstance(popup.getElement());
    if (popover) {
      popover.dispose();
    }

    popover = new bootstrap.Popover(document.querySelector("#popup"), {
      animation: false,
      container: document.querySelector("#popup"),
      content: `<img src="${place.img}" alt="${place.name}" class="img-fluid" style="min-width:300px;" />`,
      html: true,
      placement: "bottom",
      title: `<h3 class="h5 text-center m-0">${place.name}</h3>`,
    });

    popover.show();
  }
}

// Task 3
function populateRecommendationCards(filteredPlaces) {
  // Step 1: Store the DOM element with the id of "recommendations" in a variable
  const recommendationsCards = document.getElementById("recommendations");
  // Step 2: Clear the "recommendations" innerHTML
  recommendationsCards.innerHTML = "";
  // Step 3: Loop through the filteredPlaces array
  filteredPlaces.forEach((place) => {
    // Step 4: Create a card for each place using the createCard function
    const card = createCard(place, map);
    // Step 5: Add/append each card to the recommendations DOM element
    recommendationsCards.appendChild(card);
  });
}

// Task 4
function findPlaceByName(placeName) {
  // Step 1: Loop through the PLACES array
  for (let i = 0; i < PLACES.length; i++) {
    let place = PLACES[i];

    // Step 2: If a place object's name property matches the placeName parameter, return that place object
    if (place.name === placeName) {
      return place;
    }
  }
}
