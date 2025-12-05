let allData = [];  // store full CSV globally
let filterActive = false; // track toggle state

document.addEventListener("DOMContentLoaded", () => {
    fetch("events.csv")
        .then(resp => resp.text())
        .then(text => {
            allData = parseCSV(text);
            scatterValues(allData);
        })
        .catch(err => {
            console.error(err);
            document.body.innerHTML += "<p>Failed to fetch/parse CSV.</p>";
        });

    // --- ABOUT button wiring ---
    const aboutBtn = document.getElementById("about-btn");
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");

if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
        content.innerHTML = `
            <p>This visualization shows the human and financial costs from documented billion-dollar US disasters.</p>
            <p>Red numbers represent the number of deaths associated with a given disaster, and blue values represent the unadjusted costs of the disaster. Click on any number to see which event it belongs.</p>
            <p>As you can see by selecting only the events with costs higher than the annual US national defense spending (an estimated $800 billion), many disasters still far surpass this number.</p>
            <p>Time to invest more in mitigation and preparedness spending?</p>
            <p><strong>Author:</strong> Ellie Maclennan</p>
        `;
        popup.classList.remove("hidden");
    });
}

    // --- FILTER toggle button wiring ---
    const filterBtn = document.getElementById("filter-btn");
    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            filterActive = !filterActive; // toggle state
            const container = document.getElementById("container");
            container.innerHTML = ""; // clear all numbers

            if (filterActive) {
                // show only costly events
                const filtered = allData.filter(row => {
                    const costStr = row[" Cost"] || row["Cost"] || "";
                    const costNum = Number(costStr.replace(/[^0-9.-]+/g,""));
                    return !isNaN(costNum) && costNum > 800000000000;
                });
                scatterValues(filtered);
                filterBtn.textContent = "show all events";
            } else {
                // show all events
                scatterValues(allData);
                filterBtn.textContent = "only show events more costly than annual US national defense spending";
            }
        });
    }

    // Close popup when clicking anywhere on overlay
    if (popup) {
        popup.addEventListener("click", () => {
            popup.classList.add("hidden");
        });
    }
});

// ---- Parse CSV (supports quoted fields) ----
function parseCSV(text) {
    const rows = text.trim().split("\n");
    const headers = rows.shift().split(",").map(h => h.trim());

    return rows.map(row => {
        const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
                        .map(c => c.replace(/^"|"$/g, "").trim());
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i]);
        return obj;
    });
}

// --------------------------------------------
// Scattered values + drifting/swirl animation
// --------------------------------------------
function scatterValues(data) {
    const container = document.getElementById("container");
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;

    const movingElements = [];

    data.forEach(row => {

        // ---- DEATHS ----
        const d = row["Deaths"];
        if (d !== "" && !isNaN(d)) {
            let div = document.createElement("div");
            div.className = "death";
            div.textContent = d;

            div.dataset.eventName = row["Name"];
            div.dataset.type = "death";

            let x = Math.random() * width;
            let y = Math.random() * height;
            div.style.left = x + "px";
            div.style.top = y + "px";

            movingElements.push({
                el: div,
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });

            div.addEventListener("click", () => {
                showPopup(div.dataset.type, div.dataset.eventName);
            });

            container.appendChild(div);
        }

        // ---- COST ----
        const cost = row[" Cost"] || row["Cost"] || "";
        if (cost && cost.trim() !== "") {
            let div = document.createElement("div");
            div.className = "cost";
            div.textContent = cost;

            div.dataset.eventName = row["Name"];
            div.dataset.type = "cost";

            let x = Math.random() * width;
            let y = Math.random() * height;
            div.style.left = x + "px";
            div.style.top = y + "px";

            movingElements.push({
                el: div,
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });

            div.addEventListener("click", () => {
                showPopup(div.dataset.type, div.dataset.eventName);
            });

            container.appendChild(div);
        }
    });

    function animate() {
        movingElements.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
            p.el.style.left = p.x + "px";
            p.el.style.top = p.y + "px";
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// ---- Custom popup ----
function showPopup(type, eventName) {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");

    let msg = "";
    if (type === "death") {
        msg = `Deaths from ${eventName}`;
    } else if (type === "cost") {
        msg = `The estimated cost of ${eventName}`;
    } else {
        msg = eventName;
    }

    content.textContent = msg;
    popup.classList.remove("hidden");

    popup.onclick = () => popup.classList.add("hidden");
}
