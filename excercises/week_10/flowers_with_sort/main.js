console.log('this works')

// Step 1a. Select the <ul> so we can put countries inside it
const ul = document.querySelector("ul");
// Step 1b. Create a variable to hold the countries data
let countries = [];

// Step 2. Show a loading message
ul.innerHTML = "<li>Loading countries...</li>";

// Step 3. Use fetch() to get data from the REST Countries API (https://restcountries.com/)
fetch("https://restcountries.com/v3.1/all?fields=name,flags")
  .then((response) => response.json())
  .then((data) => {
    // Sort initially by name (ascending)
    countries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    // Note: call the render function again to update the page
    renderCountriesToPage(countries);
  })
  .catch((error) => {
    console.error("Error fetching countries:", error);
    ul.innerHTML = "<li>Failed to load data.</li>";
  });

// Step 4. Write a function to render the country cards
function renderCountriesToPage(countries) {
  ul.innerHTML = ""; // clear previous content

  countries.forEach((country) => {
    const li = document.createElement("li");
    li.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = country.name.common;

    const img = document.createElement("img");
    img.src = country.flags.png;
    img.alt = `Flag of ${country.name.common}`;

    li.appendChild(title);
    li.appendChild(img);
    ul.appendChild(li);
  });
}

// Step 5a. Select the parent .filters
const filterBtns = document.querySelector(".filters");
// Step 5b. Add a click listener 
filterBtns.addEventListener("click", sortingFn);

// Step 6. Write the sorting function
function sortingFn(e) {
  if (!e.target.classList.contains("filter-btn")) return;

  // Toggle active button
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.classList.remove("active")
  );
  e.target.classList.add("active");

  const filterValue = e.target.dataset.filter;

  if (filterValue === "ascending") {
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } else if (filterValue === "descending") {
    countries.sort((a, b) => b.name.common.localeCompare(a.name.common));
  }

  // Note: call the render function again to update the page
  renderCountriesToPage(countries);
}

