console.log('this works');

// Step 1. create an array of flower objects:

const flowers = [
  {
    name: "Tulip",
    color: "yellow",
    image: "https://cdn.britannica.com/37/227037-050-CA792866/Broken-tulip-flower.jpg"
  },
  {
    name: "Daffodil",
    color: "yellow",
    image: "https://h2.commercev3.net/cdn.brecks.com/images/800/67248A.jpg"
  },
  {
    name: "Sunflower",
    color: "yellow",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/800px-Sunflower_sky_backdrop.jpg"
  },
  {
    name: "Bluebell",
    color: "blue",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Hyacinthoides_non-scripta_%28Common_Bluebell%29.jpg"
  },
  {
    name: "Rose",
    color: "red",
    image: "https://www.jacksonandperkins.com/images/xxl/v1780.jpg"
  }
];

// Step 2. Select the <ul> so we can put cards inside it:
const ul = document.querySelector("ul");

/*
    Step 6. Make the filters work
    const filterBtns = document.querySelector(".filters");
    const cards = document.querySelectorAll(".card");
*/

// Step 3. Write a function that loops through the array and builds one <li> per flower:
function renderFlowersToPage(flowersArray) {
  for (let i = 0; i < flowersArray.length; i++) {
    // 1. create the li
    const listItem = document.createElement("li");
    listItem.classList.add(flowersArray[i].color, "card", `item--${i}`);

    // 2. create title
    const title = document.createElement("h3");
    title.textContent = flowersArray[i].name;

    // 3. create color text
    const color = document.createElement("p");
    color.textContent = flowersArray[i].color;

    // 4. create image
    const image = document.createElement("img");
    image.setAttribute("src", flowersArray[i].image);

    // 5. add to page
    ul.appendChild(listItem);
    listItem.appendChild(title);
    listItem.appendChild(color);
    listItem.appendChild(image);
  }
}

// Step 4. Call the function and pass in the array of flower objects
renderFlowersToPage(flowers);

// Step 5. At this point, you should see 5 flower cards on the page.

/*
    Step 7. Add a click listener to the filters area:
    function filterFn(e) {
        // only run if a button was clicked
        if (e.target.classList.contains("filter-btn")) {
            // remove active class from current button
            filterBtns.querySelector(".active").classList.remove("active");
            // add to the clicked one
            e.target.classList.add("active");

            const filterValue = e.target.getAttribute("data-filter");

            // loop through all cards
            for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            if (card.classList.contains(filterValue) || filterValue === "all") {
                card.classList.remove("hide");
                card.classList.add("show");
            } else {
                card.classList.remove("show");
                card.classList.add("hide");
            }
            }
        }
    }

    filterBtns.addEventListener("click", filterFn);
*/

// Step 8. Test the filters by clicking the buttons!

/*
    Optional Step 9. Card click behavior

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("this card was clicked");
        });
    });

    Use this logic to show a more detailed view of the flower with a modal etc
*/