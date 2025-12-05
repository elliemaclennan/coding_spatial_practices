const data = [
  {
    name: "Eastern Red Columbine",
    scientificName: "Aquilegia canadensis",
    type: "Perennial wildflower",
    habitat: "Rocky woods and open slopes",
    bloomSeason: "April–June",
    color: "Red and yellow",
    sunlight: "Partial shade to full sun"
  },
  {
    name: "New York Ironweed",
    scientificName: "Vernonia noveboracensis",
    type: "Perennial wildflower",
    habitat: "Moist meadows and stream banks",
    bloomSeason: "July–September",
    color: "Vivid purple",
    height: "4–6 feet tall"
  },
  {
    name: "Sugar Maple",
    scientificName: "Acer saccharum",
    type: "Deciduous tree",
    habitat: "Mixed hardwood forests",
    bloomSeason: "April–May",
    color: "Green leaves turning orange-red in fall",
    notableUse: "Source of maple syrup"
  },
  {
    name: "Blue Flag Iris",
    scientificName: "Iris versicolor",
    type: "Perennial wetland plant",
    habitat: "Swamps, wet meadows, pond edges",
    bloomSeason: "May–July",
    color: "Blue to violet with yellow markings",
    height: "2–3 feet tall"
  },
  {
    name: "Eastern Redbud",
    scientificName: "Cercis canadensis",
    type: "Small deciduous tree",
    habitat: "Woodland edges and slopes",
    bloomSeason: "April–May",
    color: "Pinkish-purple flowers",
    specialFeature: "Heart-shaped leaves"
  }
];

const resultsContainer = document.getElementById("resultsContainer");
const savedList = document.getElementById("savedList");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");

let saved = [];

function renderCards(list, query = "") {
  resultsContainer.innerHTML = "";
  if (list.length === 0) {
    resultsContainer.innerHTML = `<p>No results for "<strong>${query}</strong>"</p>`;
    return;
  }

  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    // highlight matching text in name
    const nameHighlighted = highlightMatch(item.name, query);

    card.innerHTML = `
      <h3>${nameHighlighted}</h3>
      <p class="meta">${item.type}</p>
      <p class="hint">Click to save ↓</p>
    `;

    card.addEventListener("click", () => {
      if (!saved.includes(item.name)) {
        saved.push(item.name);
        renderSaved();
        // micro feedback
        card.style.transform = "scale(.97)";
        setTimeout(() => card.style.transform = "", 140);
      }
    });

    resultsContainer.appendChild(card);
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(query, "ig");
  return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function renderSaved() {
  savedList.innerHTML = "";
  saved.forEach(name => {
    const pill = document.createElement("div");
    pill.className = "saved-pill";
    pill.textContent = name;
    pill.addEventListener("click", () => {
      // remove on click
      saved = saved.filter(n => n !== name);
      renderSaved();
    });
    savedList.appendChild(pill);
  });
}

function handleSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
  );
  renderCards(filtered, q);
  resultsCount.textContent =
    q === ""
      ? `Showing all ${data.length} items`
      : `Found ${filtered.length} for “${q}”`;
}

searchInput.addEventListener("input", handleSearch);

// initial render
renderCards(data);
renderSaved();
