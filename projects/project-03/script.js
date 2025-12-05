document.addEventListener("DOMContentLoaded", () => {
    fetch("events.csv")
        .then(resp => resp.text())
        .then(text => {
            const data = parseCSV(text);
            scatterValues(data);
        })
        .catch(err => {
            console.error(err);
            document.body.innerHTML += "<p>Failed to fetch/parse CSV.</p>";
        });

    // --- ABOUT button wiring (integrated into same DOMContentLoaded to avoid conflicts) ---
    const aboutBtn = document.getElementById("about-btn");
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");

    if (aboutBtn) {
        aboutBtn.addEventListener("click", () => {
            // Put a short helpful about message — you can edit this later
            content.textContent =
                "This visualization shows US billion-dollar disasters. Red numbers represent number of deaths and blue values represents the unadjusted costs associated with each disaster. Click on any number to see which event it belongs to.";
            popup.classList.remove("hidden");
        });
    }

    // Close popup when clicking anywhere on the overlay
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

            // initial randomized location
            let x = Math.random() * width;
            let y = Math.random() * height;
            div.style.left = x + "px";
            div.style.top = y + "px";

            // random drifting speeds
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

    // ---- Animation loop for gentle drifting/swirl ----
    function animate() {
        movingElements.forEach(p => {

            // Move gently
            p.x += p.dx;
            p.y += p.dy;

            // Bounce off edges
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

    // clicking overlay closes it (handled in DOMContentLoaded), but keep safety here too
    popup.onclick = () => popup.classList.add("hidden");
}
